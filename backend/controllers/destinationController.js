const db = require("../config/db");

module.exports = {
  getDestinations: (req, res) => {
    db.query("SELECT id, name, location, image FROM destinations ORDER BY id DESC", [], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json(results);
    });
  },

  getDestinationById: (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM destinations WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (results.length === 0) return res.status(404).json({ message: "Destination not found" });
      res.json(results[0]);
    });
  }
};
