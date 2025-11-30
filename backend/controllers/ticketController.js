const db = require("../config/db");

module.exports = {
  getTicketByOrder: (req, res) => {
    const orderId = req.params.orderId;
    const userId = req.user.id;

    db.query("SELECT * FROM orders WHERE id = ?", [orderId], (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (rows.length === 0) return res.status(404).json({ message: "Order not found" });
      const order = rows[0];
      if (order.user_id !== userId) return res.status(403).json({ message: "Forbidden" });
      if (order.status !== "paid") return res.status(400).json({ message: "Payment not completed" });

      db.query("SELECT ticket_code, issued_at FROM tickets WHERE order_id = ? ORDER BY id DESC LIMIT 1", [orderId], (err2, tRows) => {
        if (err2) return res.status(500).json({ message: "DB error", error: err2 });
        if (!tRows || tRows.length === 0) return res.status(404).json({ message: "Ticket not found" });

        // get package title
        db.query("SELECT name FROM tour_packages WHERE id = ?", [order.package_id], (err3, pkgRows) => {
          const packageName = pkgRows && pkgRows[0] ? pkgRows[0].name : "";
          res.json({
            orderId: order.id,
            ticket_code: tRows[0].ticket_code,
            issued_at: tRows[0].issued_at,
            fullname: order.customer_name,
            package_name: packageName,
            depart_date: order.travel_date,
            people: order.people_count
          });
        });
      });
    });
  }
};
