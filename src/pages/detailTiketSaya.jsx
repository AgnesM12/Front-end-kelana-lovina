import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

// Komponen untuk isi PDF
const TiketPdfContent = ({ paket, data }) => {
    const formatTotalHarga = () => {
        const hargaPerOrang = parseInt(paket?.price?.replace(/\D/g, "") || '0');
        const jumlahOrang = data?.jumlahOrang || 0;
        const total = (jumlahOrang * hargaPerOrang) + 10000;
        return total.toLocaleString("id-ID");
    };

    const styles = StyleSheet.create({
        page: { flexDirection: 'column', padding: 20, backgroundColor: '#fff' },
        section: { margin: 10, padding: 15, border: '1px solid black', borderRadius: 8, backgroundColor: '#fff' },
        header: { fontSize: 20, marginBottom: 15, textAlign: 'center', fontWeight: 'bold', color: '#005ED1' },
        row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
        titlePaket: { fontSize: 20, fontWeight: 'bold', color: '#000', paddingTop: 10 },
        label: { fontSize: 10, color: 'gray', paddingTop: 5 },
        value: { fontSize: 13, fontWeight: 'bold', color: '#000', paddingTop: 10 },
        barcodeImage: { width: '50%', height: 50, marginBottom: 10, alignSelf: 'center' },
        separator: { marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#AAA', borderBottomStyle: 'dashed' }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation='landscape'>
                <View style={styles.section}>
                    <Text style={styles.header}>TIKET WISATA ANDA</Text>
                    <Image style={styles.barcodeImage} src="/barcode.png" />
                    <Text style={styles.titlePaket}>{paket?.title || 'Paket Tidak Tersedia'}</Text>
                    <Text style={[styles.titlePaket, { marginBottom: 10 }]}>{data?.fullName || 'Nama Pelanggan'}</Text>

                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Tanggal Tiket</Text>
                            <Text style={styles.value}>{data?.tanggalBerangkat || '-'}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Waktu Keberangkatan</Text>
                            <Text style={styles.value}>{paket?.departurTime || '-'}</Text>
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

                    <View style={styles.separator} />

                    <View style={styles.row}>
                        <Text style={styles.value}>{data?.bookingId || "ID Tiket"}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

// Komponen utama Tiket
function Tiket() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [tiket, setTiket] = useState({ paket: null, data: null });

    const buttonStyle = { width: '200px', height: '50px', borderRadius: '8px' };

    useEffect(() => {
        if (state?.paket && state?.data) {
            setTiket({ paket: state.paket, data: state.data });
        } else {
            const tiketSaya = JSON.parse(localStorage.getItem("tiketSaya")) || [];
            console.log("LocalStorage tiketSaya:", tiketSaya);
            if (tiketSaya.length > 0) {
                const t = tiketSaya[0];
                setTiket({
                    paket: {
                        title: t.paket,
                        imageSrc: t.imageSrc,
                        departurTime: t.departurTime,
                        price: t.price || "0"
                    },
                    data: {
                        fullName: t.fullName || "Nama Pelanggan",
                        tanggalBerangkat: t.tanggalBerangkat,
                        jumlahOrang: t.jumlahOrang,
                        bookingId: t.orderId
                    }
                });
            } else {
                navigate("/tiketSaya");
            }
        }
    }, [state, navigate]);

    const { paket, data } = tiket;

    if (!paket || !data) return <p>Memuat tiket...</p>;

    const fileName = `tiket_${data.fullName}_${paket.title}.pdf`;

    return (
        <div>
            <div className="flex min-h-screen flex-col justify-center items-center">
                <p className="text-3xl font-bold pt-10 py-4">Tiket Wisata Anda</p>

                <div className="flex flex-col justify-center bg-white shadow-[0px_6px_40px_0px_rgba(0,94,209,0.16)] rounded-2xl max-w-4xl px-8 py-3">
                    <img src="/barcode.png" alt="barcode tiket" />
                    <p className="text-3xl font-bold mt-5">{paket.title}</p>
                    <p className="text-lg font-bold mt-5">{data.fullName}</p>

                    <div className="flex flex-col mt-5">
                        <p className="text-sm font-semibold text-gray-300">Tanggal Tiket</p>
                        <p className="text-lg font-semibold mt-1">{data.tanggalBerangkat}</p>
                    </div>

                    <div className="flex flex-col mt-5">
                        <p className="text-sm font-semibold text-gray-300">Waktu Keberangkatan</p>
                        <div className="flex justify-between">
                            <p className="text-lg font-semibold">{paket.departurTime}</p>
                            <p className="text-lg font-semibold">
                                Rp.{(((data.jumlahOrang || 0) * parseInt(paket.price?.replace(/\D/g, "") || '0')) + 10000).toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>

                    <p className="my-3 border-t border-dashed border-gray-400"></p>

                    <div className="flex justify-between">
                        <p>{data.bookingId || "Tiket ID"}</p>
                        <p className="text-lg font-semibold">{data.jumlahOrang} orang</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center p-10 gap-5">
                <PDFDownloadLink
                    document={<TiketPdfContent paket={paket} data={data} />}
                    fileName={fileName}
                >
                    {({ loading }) => (
                        <button disabled={loading} style={buttonStyle} className="bg-[#005ED1] text-white font-semibold rounded-xl">
                            {loading ? 'Membuat PDF...' : 'Unduh tiket'}
                        </button>
                    )}
                </PDFDownloadLink>

                <button
                    onClick={() => navigate('/destinasi')}
                    style={buttonStyle}
                    className="bg-[#005ED1] text-white font-semibold rounded-xl"
                >
                    Kembali
                </button>
            </div>
        </div>
    );
}

export default Tiket;
