import db from "../config/db.js";
import { createPayment } from "../models/paymentModel.js";
import snap from "../config/midtrans.js";
import crypto from "crypto";

export const savePayment = async (req, res) => {
  const d = req.body;

  console.log("📥 DATA DARI FE:", d);

  if (
    !d.fullName ||
    !d.email ||
    !d.nomorTelpon ||
    !d.jumlahOrang ||
    !d.tanggalBerangkat ||
    !d.paketId ||
    !d.totalPayment ||
    !d.paketNama
  ) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  try {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const randomNum = String(Date.now()).slice(-4);
    const order_id = `KL${dd}${mm}${yyyy}-${randomNum}`;

    const paymentData = {
      order_id,
      fullName: d.fullName,
      email: d.email,
      nomorTelpon: d.nomorTelpon,
      jumlahOrang: d.jumlahOrang,
      tanggalBerangkat: d.tanggalBerangkat,
      paketId: d.paketId,
      paketNama: d.paketNama,
      totalPayment: d.totalPayment,
      status: "pending",
    };

    await new Promise((resolve, reject) => {
      createPayment(paymentData, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const BIAYA_LAYANAN = 10000;
    const hargaPerOrang = Math.round(
      (d.totalPayment - BIAYA_LAYANAN) / d.jumlahOrang
    );

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: Number(d.totalPayment), 
      },
      credit_card: { secure: true },
      customer_details: {
        first_name: d.fullName.split(" ")[0],
        last_name: d.fullName.split(" ").slice(1).join(" ") || "",
        email: d.email,
        phone: d.nomorTelpon,
      },
      item_details: [
        {
          id: `PAKET-${d.paketNama.replace(/\s+/g, "-")}`,
          price: hargaPerOrang,
          quantity: d.jumlahOrang,
          name: d.paketNama,
        },
        {
          id: "FEE-LAYANAN",
          price: BIAYA_LAYANAN,
          quantity: 1,
          name: "Biaya Layanan",
        },
      ],
      expiry: {
        unit: "minutes",
        duration: 15,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return res.json({
      message: "Transaksi berhasil dibuat",
      order_id,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("SAVE PAYMENT ERROR:", error);
    return res.status(500).json({
      message: "Gagal membuat transaksi Midtrans",
      error: error.message,
    });
  }
};


export const midtransNotification = async (req, res) => {
  try {
    const notification = req.body;

    const signature = crypto
      .createHash("sha512")
      .update(
        notification.order_id +
          notification.status_code +
          notification.gross_amount +
          process.env.MIDTRANS_SERVER_KEY
      )
      .digest("hex");

    if (signature !== notification.signature_key) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    let newStatus = "pending";

    if (["capture", "settlement"].includes(transactionStatus)) {
      if (["accept", "challenge"].includes(fraudStatus)) {
        newStatus = "success";
      }
    } else if (["cancel", "deny", "expire"].includes(transactionStatus)) {
      newStatus = "failed";
    }

    const query = `
      UPDATE payments SET 
        status = ?, 
        midtrans_transaction_id = ?,
        payment_type = ?,
        fraud_status = ?
      WHERE order_id = ?
    `;

    db.query(
      query,
      [
        newStatus,
        notification.transaction_id,
        notification.payment_type,
        fraudStatus || null,
        orderId,
      ],
      (err) => {
        if (err) console.error("Update status error:", err);
      }
    );

    return res.status(200).send("OK");
  } catch (error) {
    console.error("MIDTRANS NOTIFICATION ERROR:", error);
    return res.status(500).send("Error");
  }
};
