const db = require("../config/db");

// helper to generate payment code
function genCode(prefix = "") {
  return prefix + Math.random().toString(36).substring(2, 10).toUpperCase();
}

module.exports = {
  createOrder: (req, res) => {
    const userId = req.user.id;
    const {
      package_id,
      fullname,
      identity_type,
      identity_number,
      people_count,
      phone,
      travel_date,
      total_price
    } = req.body;

    if (!package_id || !fullname || !identity_type || !identity_number || !people_count || !travel_date || !total_price)
      return res.status(400).json({ message: "Missing required fields" });

    const payment_code = genCode("PAY-");

    db.query(
      `INSERT INTO orders (user_id, package_id, customer_name, identity_type, identity_number, people_count, phone, travel_date, total_price, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [userId, package_id, fullname, identity_type, identity_number, people_count, phone, travel_date, total_price],
      (err, result) => {
        if (err) return res.status(500).json({ message: "DB error", error: err });
        const orderId = result.insertId;
        // create a payment record
        db.query(
          "INSERT INTO payments (order_id, method, barcode, amount, status) VALUES (?, ?, ?, ?, 'waiting')",
          [orderId, "Bank Transfer", payment_code, total_price],
          (err2) => {
            if (err2) return res.status(500).json({ message: "DB error", error: err2 });
            res.status(201).json({ message: "Order created", orderId, payment_code });
          }
        );
      }
    );
  },

  getOrderById: (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM orders WHERE id = ?", [id], (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (rows.length === 0) return res.status(404).json({ message: "Order not found" });
      res.json(rows[0]);
    });
  },

  getOrdersByUser: (req, res) => {
    const userIdParam = Number(req.params.userId);
    if (req.user.id !== userIdParam) return res.status(403).json({ message: "Forbidden" });

    db.query("SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC", [userIdParam], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json(results);
    });
  }
};
