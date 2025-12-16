import db from "../config/db.js";

export const createPayment = (paymentData, callback) => {
  const query = `
    INSERT INTO payments 
    (fullName, email, jumlahOrang, nomorTelpon, tanggalBerangkat, paketId, paketNama, totalPayment, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    paymentData.fullName,
    paymentData.email,
    paymentData.jumlahOrang,
    paymentData.nomorTelpon,
    paymentData.tanggalBerangkat,
    paymentData.paketId,
    paymentData.paketNama,
    paymentData.totalPayment,
    paymentData.status || "success",
  ];

  db.query(query, values, callback);
};