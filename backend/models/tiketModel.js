import db from "../config/db.js";

export const createTiket = async ({
  user_id,
  paket_id,
  tanggalBerangkat,
  payment_id,
  barcode_tiket,
  booking_id,
  jumlahOrang,
}) => {
  const [result] = await db.execute(
    `INSERT INTO tiket 
     (user_id, paket_id, tanggalBerangkat, payment_id, barcode_tiket, status, booking_id, jumlahOrang)
     VALUES (?, ?, ?, ?, ?, 'UNUSED', ?, ?)`,
    [user_id, paket_id, tanggalBerangkat, payment_id, barcode_tiket, booking_id, jumlahOrang]
  );

  return result.insertId;
};

export const getTiketByUser = async (user_id) => {
  const [rows] = await db.execute(
    `SELECT 
      t.id,
      t.tanggalBerangkat,
      t.status,
      t.barcode_tiket,
      t.payment_id,
      t.jumlahOrang,
      t.booking_id,
      t.created_at,
      t.updated_at,
      p.id AS paket_id,
      p.title,
      p.deskripsi,
      p.imageSrc,
      p.price,
      p.departurTime
     FROM tiket t
     JOIN paket p ON t.paket_id = p.id
     WHERE t.user_id = ?
     ORDER BY t.created_at DESC`,
    [user_id]
  );
  return rows;
};

export const getTiketById = async (tiket_id, user_id) => {
  const [rows] = await db.execute(
    `SELECT 
      t.id,
      t.tanggalBerangkat,
      t.status,
      t.barcode_tiket,
      t.payment_id,
      t.jumlahOrang,
      t.booking_id,
      t.created_at,
      t.updated_at,
      p.id AS paket_id,
      p.title,
      p.deskripsi,
      p.imageSrc,
      p.price,
      p.departurTime
     FROM tiket t
     JOIN paket p ON t.paket_id = p.id
     WHERE t.id = ? AND t.user_id = ?
     LIMIT 1`,
    [tiket_id, user_id]
  );
  return rows[0];
};
