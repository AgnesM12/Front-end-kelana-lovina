const db = require("../config/db");

function fakeBarcodeBase64(text) {
  return Buffer.from(`BARCODE:${text}`).toString("base64");
}

function genTicketCode() {
  return "TICK-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

module.exports = {
  getPaymentInfo: (req, res) => {
    const orderId = req.params.orderId;
    const userId = req.user.id;

    db.query("SELECT * FROM orders WHERE id = ?", [orderId], (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (rows.length === 0) return res.status(404).json({ message: "Order not found" });
      const order = rows[0];
      if (order.user_id !== userId) return res.status(403).json({ message: "Forbidden" });

      db.query("SELECT * FROM payments WHERE order_id = ? ORDER BY id DESC LIMIT 1", [orderId], (err2, payRows) => {
        if (err2) return res.status(500).json({ message: "DB error", error: err2 });
        const payment = payRows && payRows[0] ? payRows[0] : null;
        const barcode = fakeBarcodeBase64(payment ? payment.barcode : `PAY-${orderId}`);
        res.json({
          orderId: order.id,
          amount: payment ? payment.amount : order.total_price,
          payment_code: payment ? payment.barcode : `PAY-${orderId}`,
          barcode_base64: barcode,
          instructions: "Transfer to bank account with code"
        });
      });
    });
  },

  confirmPayment: (req, res) => {
    const orderId = req.params.orderId;
    const userId = req.user.id;

    db.query("SELECT * FROM orders WHERE id = ?", [orderId], (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (rows.length === 0) return res.status(404).json({ message: "Order not found" });
      const order = rows[0];
      if (order.user_id !== userId) return res.status(403).json({ message: "Forbidden" });
      if (order.status === "paid") return res.json({ message: "Already paid" });

      const ticket_code = genTicketCode();

      db.query("UPDATE orders SET status = 'paid', ticket_code = ? WHERE id = ?", [ticket_code, orderId], (err2) => {
        if (err2) return res.status(500).json({ message: "DB error", error: err2 });
        // update payment as success
        db.query("UPDATE payments SET status = 'success' WHERE order_id = ?", [orderId], (err3) => {
          if (err3) return res.status(500).json({ message: "DB error", error: err3 });
          // create ticket row
          db.query("INSERT INTO tickets (order_id, ticket_code) VALUES (?, ?)", [orderId, ticket_code], (err4) => {
            if (err4) return res.status(500).json({ message: "DB error", error: err4 });
            res.json({ message: "Payment confirmed", ticket_code });
          });
        });
      });
    });
  }
};
