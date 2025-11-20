const db = require("../config/db");

module.exports = {
  addItinerary: (req, res) => {
    const userId = req.user.id;
    const { package_id, date, people_count, total_cost } = req.body;
    if (!package_id || !date) return res.status(400).json({ message: "package_id and date required" });

    db.query(
      "INSERT INTO itinerary (user_id, package_id, date, people_count, total_cost) VALUES (?, ?, ?, ?, ?)",
      [userId, package_id, date, people_count || 1, total_cost || 0],
      (err, result) => {
        if (err) return res.status(500).json({ message: "DB error", error: err });
        res.status(201).json({ message: "Itinerary added", id: result.insertId });
      }
    );
  },

  getItinerariesByUser: (req, res) => {
    const userIdParam = Number(req.params.userId);
    if (req.user.id !== userIdParam) return res.status(403).json({ message: "Forbidden" });

    db.query(
      `SELECT it.id, it.package_id, tp.name as package_name, tp.price, it.date, it.people_count, it.total_cost
       FROM itinerary it
       JOIN tour_packages tp on tp.id = it.package_id
       WHERE it.user_id = ? ORDER BY it.id DESC`,
      [userIdParam],
      (err, results) => {
        if (err) return res.status(500).json({ message: "DB error", error: err });
        res.json(results);
      }
    );
  },

  deleteItinerary: (req, res) => {
    const id = req.params.id;
    db.query("SELECT user_id FROM itinerary WHERE id = ?", [id], (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (rows.length === 0) return res.status(404).json({ message: "Not found" });
      if (rows[0].user_id !== req.user.id) return res.status(403).json({ message: "Forbidden" });

      db.query("DELETE FROM itinerary WHERE id = ?", [id], (err2) => {
        if (err2) return res.status(500).json({ message: "DB error", error: err2 });
        res.json({ message: "Itinerary deleted" });
      });
    });
  }
};
