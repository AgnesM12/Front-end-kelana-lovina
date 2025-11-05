    import React from "react";
    import { Navigate, useLocation, useNavigate } from 'react-router-dom';

    function DetailMenu(){

        const { state: paket } = useLocation(); 
        const navigate = useNavigate();

        const cardContainerStyle={
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            maxWidth: '1200px',   
            margin: '0 auto',  
        };

        const cardDeskripsi ={
            width: '900px',
            minHeight: ' 1020px', 
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,94,209,0.16)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            textAlign: "left",
            justifyContent: 'stretch', 
            alignItems: 'flex-start', //teks rata kiri
            padding: '30px', 
            margin: '20px 0px',
          };

          const imageStyle={
            width: '100%', 
            height: '450px', 
            objectFit: 'cover', 
            borderRadius: '15px',
            marginButtom: '20px',
          };
          
          const buttonStyle ={
            width: '100%',
            height: '51px',
            backgroundColor: '#005ED1', 
            color : '#ffffff', 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '20px',
            borderRadius: '8px', 
            margin: '30px 0px 10px 0px', 
            border: 'none',
            cursor: 'pointer', 
            marginTop: "20px",
        };
      
          return (
            <div style={cardContainerStyle}>
              <div style={cardDeskripsi}> 
                <img src={paket.gambar} alt="" style={imageStyle} /> <br/>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <h2><b>{paket.nama}</b></h2>
                    <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center', gap: '50px'}}>
                      <h2 style={{color:'#005ED1'}}><b>{paket.harga}</b></h2>
                      <h6 style={{color:'#878787', fontFamily:'poppins, sans-serif' }}><b>{paket.rating}</b> </h6>
                    </div>
                </div>

                <div style={{paddingTop: '30px'}}>
                  <h6><b> Durasi: </b> {paket.durasi} </h6>
                  <h6><b> Kapasitas: </b> {paket.kapasitas} </h6> 
                </div>

                <div style={{paddingTop: '15px'}}>
                <h4><b> Paket Termasuk</b></h4>
                  <ul className="list-disc list-outside">
                    {paket.paketTermasuk.map((item, index) => (
                      <li key={index}>{item}</li>
                      ))}
                  </ul>
                </div>
                
                <div style={{paddingTop: '10px'}}>
                  <h4><b>Jadwal dan Lokasi</b></h4>
                  <h6><b>Waktu Keberangkatan: </b> {paket.waktuBerangkat} </h6>
                  <h6><b>Lokasi: </b> {paket.lokasi} </h6>
                </div>
              
                <button  style= {buttonStyle} onClick={() => navigate('/menuPaket/detailPaket/menuPembayaran', {state: paket})}><b> Pesan Sekarang </b></button>
                
                </div>
              </div>
            );
          }

    export default DetailMenu;

  

        
        
        