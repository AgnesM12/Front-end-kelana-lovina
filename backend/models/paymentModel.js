import db from "../config/db.js";

export const createPayment = (paymentData, callback) => {
  const query = `
    INSERT INTO payments 
    (order_id, fullName, email, jumlahOrang, nomorTelpon, tanggalBerangkat, paketId, paketNama, totalPayment, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

const values = [
  paymentData.order_id,
  paymentData.fullName,
  paymentData.email,
  paymentData.jumlahOrang,
  paymentData.nomorTelpon,
  paymentData.tanggalBerangkat,
  paymentData.paketId,
  paymentData.paketNama,
  paymentData.totalPayment,
  paymentData.status,
];

  db.query(query, values, callback);
};