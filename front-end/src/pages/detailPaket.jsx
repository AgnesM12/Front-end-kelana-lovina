    import React from "react";
    import { Navigate, useLocation, useNavigate } from 'react-router-dom';

    function DetailMenu(){

        const { state: paket } = useLocation(); 
        const navigate = useNavigate();

        const cardContainerStyle={
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            maxWidth: "1200px",   
            margin: "0 auto",  
        };

        const cardDeskripsi ={
            width: '1206px',
            // height: '1452px', 
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,94,209,0.16)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            textAlign: "left",
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', //teks rata kiri
            padding: '30px', 
            margin: '20px 0px',
          };

          const imageStyle={
            width: '100%', 
            height: '560px', 
            objectFit: 'cover', 
            borderRadius: '15px',
            marginButtom: '20px',
          };
          
          const buttonStyle ={
            width: '100%',
            height: '69.16px',
            backgroundColor: '#005ED1', 
            color : '#ffffff', 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '25px',
            borderRadius: '8px', 
            margin: '30px auto 10px auto', 
          };
      
          return (
            <div style={cardContainerStyle}>
              <div style={cardDeskripsi}> 
                <img src={paket.gambar} alt="" style={imageStyle} /> <br/>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <h2><b>{paket.nama}</b></h2>
                    <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center', gap: '30px'}}>
                      <h2><b>{paket.harga}</b></h2>
                      <p style={{fontSize: '20px', color:'#878787', fontFamily:'poppins, sans-serif' }}> {paket.rating}</p>
                    </div>
                </div>
                <h5><b> Durasi: </b> {paket.durasi} </h5>
                <h5><b> Kapasitas: </b> {paket.kapasitas} </h5> <br />
                <h2><b> Paket Termasuk</b></h2>
                  <ul className="list-disc list-outside">
                    {paket.paketTermasuk.map((item, index) => (
                      <li key={index}>{item}</li>
                      ))}
                  </ul>
                <h2><b>Jadwal dan Lokasi</b></h2>
                <h5><b>Waktu Keberangkatan: </b> {paket.waktuBerangkat} </h5>
                <h5><b>Lokasi: </b> {paket.lokasi} </h5>
                <button style={buttonStyle} onClick={() => navigate('/menuPaket/detailPaket/menuPembayaran', {state: paket})}><b> Pesan Sekarang </b></button>
                </div>
              </div>
            );
          }

    export default DetailMenu;

  

        
        
        