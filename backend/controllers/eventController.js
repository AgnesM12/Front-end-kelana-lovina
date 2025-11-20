const db = require("../config/db");

module.exports = {
  getEvents: (req, res) => {
    db.query("SELECT id, title, date, location, image FROM events ORDER BY date DESC", [], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json(results);
    });
  },

  getEventById: (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM events WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (results.length === 0) return res.status(404).json({ message: "Event not found" });
      res.json(results[0]);
    });
  }
};
