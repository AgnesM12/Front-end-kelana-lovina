const db = require("../config/db");

module.exports = {
  getPackages: (req, res) => {
    db.query("SELECT id, name, price, image FROM tour_packages ORDER BY id DESC", [], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json(results);
    });
  },

  getPackageById: (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM tour_packages WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (results.length === 0) return res.status(404).json({ message: "Package not found" });
      res.json(results[0]);
    });
  }
};
