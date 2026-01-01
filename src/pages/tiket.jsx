import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'; 

const TiketPdfContent = ({ paket, data }) => {

    const toISODate = (iso) => iso.split(" ")[0]; // ambil YYYY-MM-DD

    // Fungsi untuk menghitung total harga
    const formatTotalHarga = () => {
        const hargaPerOrang = parseInt(paket?.price?.replace(/\D/g, "") || '0');
        const jumlahOrang = data?.jumlahOrang || 0; 
        const total = (jumlahOrang * hargaPerOrang) + 10000;
        return total.toLocaleString("id-ID");
    }

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column', 
            padding: 20,
            backgroundColor: '#FFFFFF',
        },
        section: {
            margin: 10,
            padding: 15,
            border: '1px solid black',
            borderRadius: 8,
            backgroundColor: '#ffffff',
        },
        header: {
            fontSize: 20,
            marginBottom: 15,
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#005ED1',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
        },
        titlePaket: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000', 
            paddingTop: 10, 
        }, 
        label: {
            fontSize: 10,
            color: 'gray',
            paddingTop: 5,
        },
        value: {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#000000',
            paddingTop: 10,
        },
        barcodeImage: {
            width: '50%',
            height: 50, 
            marginBottom: 10, 
            alignSelf: 'center', 
        },
        separator: {
            marginTop: 10,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#AAAAAA',
            borderBottomStyle: 'dashed',
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation='landscape'>
                <View style={styles.section}>
                    <Text style={styles.header}>TIKET WISATA ANDA</Text>
                    <Image style={styles.barcodeImage} src="/barcode.png" /> 
                    
                    <Text style={styles.titlePaket} className='text-3xl'>{paket?.title || 'Paket Tidak Tersedia'}</Text>
                    <Text style={[styles.titlePaket, {marginBottom: 10}]}> {data?.fullName || 'Nama Pelanggan'}</Text>
        
                    <View style={styles.row}> 
                        <View>
                            <Text style={styles.label}>Tanggal Tiket</Text>
                            <Text style={styles.value}>{data?.tanggalBerangkat || '-'}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Waktu Keberangkatan</Text>
                            <Text style={styles.value}>{paket?.departurTime}</Text> 
                        </View>
                    </View>

                    <View style={styles.row}> 
                        <View>
                            <Text style={styles.label}>Total Harga</Text>
                            <Text style={styles.value}>Rp. {formatTotalHarga()}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Jumlah Orang</Text>
                            <Text style={styles.value}>{data?.jumlahOrang || 0} Orang</Text>
                        </View>
                    </View>

                    <View style={styles.separator}/>

                    <View style={styles.row}>
                        <Text style={styles.value}></Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};


    function Tiket() {
        const { id } = useParams();
        const navigate = useNavigate();
        const [tiket, setTiket] = useState(null);
      
        useEffect(() => {
          const fetchTiket = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:4000/api/tiket/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const json = await res.json();
            setTiket(json.tiket);
          };
          fetchTiket();
        }, [id]);
        
          if (!tiket) return null;
        
          const paket = {
            paket_id: tiket.paket_id,
            title: tiket.title,
            deskripsi: tiket.deskripsi,
            imageSrc: tiket.imageSrc,
            price: tiket.price,
            departurTime: tiket.departurTime,
            status: tiket.status,
          };
        
          const data = {
            fullName: tiket.fullName,
            tanggalBerangkat: tiket.tanggalBerangkat,
            jumlahOrang: tiket.jumlahOrang,
            bookingId: tiket.booking_id,
            paymentId: tiket.payment_id,
          };
        
          const fileName = `tiket_${data.fullName}_${paket.title}.pdf`;
          
        return(
            <div>
                <div className="flex min-h-screen flex-col justify-center items-center">
                    <p className="flex justify-center text-3xl font-bold pt-10 py-4">Tiket</p>

                    {/* Tampilan HTML di layar */}
                    <div className="flex flex-col justify-center bg-white shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] rounded-2xl max-w-4xl px-8 py-3">
                        <img src="/barcode.png" alt="barcode tiket"/>
                        <p className="flex justify-start text-3xl font-bold mt-5">{paket?.title}</p>
                        <p className="flex justify-start text-lg font-bold mt-5">{data?.fullName}</p>

                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-gray-300 mt-5">Tanggal Tiket</p>
                            <p className="text-lg font-semibold mt-3">{data?.tanggalBerangkat}</p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-300 mt-5">Waktu Keberangkatan</p>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold mt-2">{paket?.departurTime}</p>
                                <p className="text-lg font-semibold mt-2">
                                    Rp.{(((data?.jumlahOrang || 0) * parseInt(paket?.price?.replace(/\D/g, "") || '0')) + 10000).toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>

                        <p>----------------------------------------------------------------------------------------------------------------------------------</p>

                        <div className="flex justify-between">
                            <p className="text-lg font-semibold">{data?.bookingId || "Tiket ID"} </p>
                            <p className="text-lg font-semibold">{data?.jumlahOrang} orang</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center p-10 gap-5"> 
                    <PDFDownloadLink document={<TiketPdfContent paket={paket} data={data} />}  fileName={fileName}>
                        {({loading}) => (
                            <button disabled={loading} style={{...buttonStyle, borderRadius: '8px'}} className="bg-[#005ED1] text-white font-semibold">
                                {loading ? 'Membuat PDF...' : 'Unduh tiket'}
                            </button> )}
                    </PDFDownloadLink>


                    <button onClick={() => navigate('/destinasi')} style={buttonStyle} className="bg-[#005ED1] text-white font-semibold"> Kembali </button>

                </div>
            </div>
        );
    }

    export default Tiket;
