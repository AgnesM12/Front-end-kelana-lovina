    import React, { use } from "react";
    import { Navigate, useNavigate } from "react-router-dom";
    import headerFrame from '../assets/headerFrame.png'
    import morningDolphine from '../assets/morningDolphine.jpg';
    import snorkling from '../assets/snorkling.png';
    import sunrise from '../assets/sunrise.png'; 
    import dolphinWatchingTour from '../assets/dolphinWatchingTour.jpg';
    import swimWithDolphin from '../assets/swimWithDolphin.jpg';
    import privateTour from '../assets/privateTourGuide.png';
    

    function MenuPaket() {

        const navigate = useNavigate();

        const headerFrameStyle={
            width: "1200px",
            height: "458px",
            backgroundImage: `url(${headerFrame})`,
            backgroundSize: "cover",
            backgroundPosition: "center", 
            borderRadius: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "50px auto", 
        };

        const teksHeaderStyle={
            width: '870px', 
            height: '57px', 
            fontSize: '37.78px', 
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'Bold', 
            color: '#ffffff', 
            position: 'center', 
            margin: 0,
        };

        const teksTitlleStyle={
            width: '982px', 
            height: '74.65931px', 
            fontSize: '48px', 
            fontFamily: 'Poppins, sans-serif', 
            fontWeight: '790', 
            color: '#000000', 
            textAlign: "center",
            position : 'center',
            margin: '80px auto 0px auto', //(Top (80), auto (kiri kanan))
        };

        const paragraphStyle={
            width: '982px', 
            height: '71px', 
            fontSize: '16px', 
            fontFamily: 'Poppins, sans-serif', 
            fontWeight: '500', 
            color: '#000000', 
            textAlign: "center",
            margin: '0px auto 0px auto',
        };

        const cardContainerStyle={
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            maxWidth: "1200px",   
            margin: "0 auto",     
        };

        const cardPaketMenu ={
            width: "360px",
            height: "599px", 
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0,94,209,0.16)",
            overflow: "hidden",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: 'column',
            cursor: 'pointer',
            textAlign: "left",
            justifyContent: 'center', 
            alignItems: 'center', 
            margin: '20px 0px',
          };

        const imageStyle ={
            width: '323px', 
            height: '300px', 
            objectFit : 'cover', 
            borderRadius : '15px'
        };
          
        const buttonStyle ={
            width: '100%', //width: '322px'
            height: '51px',
            backgroundColor: '#005ED1', 
            color : '#ffffff', 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '18px', 
            borderRadius: '8px', 
          };

        const daftarPaket = [
            {
                id      : 'morningDolphine', 
                gambar  :  morningDolphine,
                nama    : 'Morning Dolphine Tur', 
                desk    : 'Durasi 1 Jam - Termasuk \n minuman ringan',
                harga   : 'Rp. 150.000', 
                rating  : '4.5 (45)', 
                
                durasi          : '2 Jam', 
                kapasitas       : 'Maksimal 5 orang/perahu', 
                paketTermasuk   : [' Pengalaman melihat lumba-lumba saat matahari terbit \n',
                                    'Sarapan ringan di atas perahu \n',
                                    'Pelampung keselamatan \n',
                                    'Pemandu lokal berpengalaman'],
                waktuBerangkat  : 'Setiap hari, pukul 08.30 WITA', 
                lokasi          : 'Pantai Lovina, Bali' 
            },
            {
                id      : 'snorklingDolphineTur', 
                gambar  : snorkling,
                nama    : 'Snorkling & Dolphine Tur', 
                desk    : 'Durasi 2 jam - Termasuk snorkel \n dan pemandu wisata',
                harga   : 'Rp. 350.000', 
                rating  : '4.4 (54)',

                durasi          : '2 Jam', 
                kapasitas       : 'Maksimal 5 orang/perahu', 
                paketTermasuk   : [' Satu botol air mineral untuk setiap peserta \n',
                                    'Menikmati minuman selamat datang khas Bali (Teh atau Kopi) setibanya di Pantai Lovina \n',
                                    'Peralatan snorkling \n',
                                    'Pemandu lokal berpengalaman \n',
                                    'Dokumentasi Kegiatan'],
                waktuBerangkat  : 'Setiap hari, pukul 05.30 WITA', 
                lokasi          : 'Pantai Lovina, Bali',
            }, 
            {
                id      : 'sunriseDolphinTour', 
                gambar  :  sunrise,
                nama    : 'Sunrise Dolphin Tour', 
                desk    : 'Durasi 3 jam – Termasuk snack \n & minuman', 
                harga   : 'Rp. 300.000', 
                rating  : '4.8 (79)', 
                
                durasi          : '3 Jam', 
                kapasitas       : 'Maksimal 5 orang/perahu', 
                paketTermasuk   : [ 'Pengalaman melihat lumba-lumba saat matahari terbit \n',
                                    'Sarapan ringan diatas perahu \n',
                                    'Pelampung keselamatan \n',
                                    'Pemandu lokal berpengalaman \n',
                                    'Aktifitas snorkeling'],
                waktuBerangkat  : 'Setiap hari, pukul 05.30 WITA', 
                lokasi          : 'Pantai Lovina, Bali',
            }, 
            {
                id      : 'dolphinWatchingTur', 
                gambar  : dolphinWatchingTour, 
                nama    : 'Dolphin Watching Tour', 
                desk    : 'Durasi 3 jam – Termasuk \n minuman hangat', 
                harga   : 'Rp. 200.000', 
                rating  : '4.4 (40)',

                durasi          : '3 Jam', 
                kapasitas       : 'Maksimal 5 orang/perahu', 
                paketTermasuk   : [ 'Pengalaman melihat lumba-lumba saat matahari terbit \n',
                                    'Minuman hangat di atas perahu \n',
                                    'Pelampung keselamatan \n',
                                    'Pemandu lokal berpengalaman'],
                waktuBerangkat  : 'Setiap hari, pukul 05.30 WITA', 
                lokasi          : 'Pantai Lovina, Bali',
            }, 
            {
                id      : 'swimWithDolphin', 
                gambar  :  swimWithDolphin, 
                nama    : 'Swim with Dolphin', 
                desk    : 'Durasi 1,5 jam - Termasuk \n pelampung', 
                harga   : 'Rp. 200.000', 
                rating  : '4.6 (38)', 

                durasi          : '1,5 Jam', 
                kapasitas       : 'Maksimal 5 orang/perahu', 
                paketTermasuk   : [ 'Pengalaman berenang dengan lumba-lumba \n',
                                    'Air mineral \n',
                                    'Pelampung keselamatan \n', 
                                    'Pemandu lokal berpengalaman'],
                waktuBerangkat  : 'Setiap hari, pukul 05.30 WITA', 
                lokasi          : 'Pantai Lovina, Bali',
            }, 
            {
                id      : 'privateTourGuide', 
                gambar  :  privateTour, 
                nama    : 'Private Tour Guide', 
                desk    : 'Durasi 2 jam - Termasuk satu \n perahu khusus', 
                harga   : 'Rp. 400.000', 
                rating  : '4.5 (40)', 
               
                durasi          : '2 Jam', 
                kapasitas       : 'Maksimal 5 orang/perahu', 
                paketTermasuk   : [ 'Satu perahu khusus pribadi hanya untuk Anda & rombongan \n',
                                    'Pengalaman ekslusif menyaksikan lumba-lumba \n',
                                    'Pelampung keselamatan \n',
                                    'Private guide lokal berpengalaman yang mendampingi penuh selama tur \n',
                                    'Air mineral & snack ringan di atas perahu'],
                waktuBerangkat  : 'Setiap hari, pukul 0.30 WITA', 
                lokasi          : 'Pantai Lovina, Bali',
            }
        ];
          
        return(
            <div>
                <div className="header" style={headerFrameStyle}>
                    <h1 style={teksHeaderStyle}>Temukan Paket Terbaik untuk Perjalananmu</h1>
                </div>

                <div>
                    <h5 style={teksTitlleStyle} > Paket Liburan Terbaik </h5>
                    <p style={paragraphStyle}> Nikmati berbagai pilihan paket wisata di Lovina mulai dari tur lumba-lumba, snorkeling, hingga private tour. Setiap paket <br/>
                    dirancang agar perjalanan Anda lebih praktis, seru, dan berkesan </p> 
                </div>

                <div style={cardContainerStyle}>
                    {daftarPaket.map((paketMenu) => (
                        <div key={paketMenu.id} style={cardPaketMenu}>
                        <div className="card-deskripsi">
                            <img src={paketMenu.gambar} alt={paketMenu.nama} style={imageStyle}/>
                            <h4><br /><b>{paketMenu.nama}</b></h4>
                            <p style={{fontSize: '20px', color: '#878787'}}> {paketMenu.desk.split('\n').map((line, index) => (<React.Fragment key={index}> {line} <br /></React.Fragment>))}</p>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <p style={{fontSize: '20px'}} ><b>{paketMenu.harga}</b></p>
                                <p style={{fontSize: '15px', color:'#878787', fontFamily:'poppins, sans-serif'}}> {paketMenu.rating}</p>
                            </div>
                            <button style={buttonStyle}  onClick={() => navigate('/menuPaket/detailPaket', { state: paketMenu })}> <b>Lihat Paket</b> </button>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    export default MenuPaket;
