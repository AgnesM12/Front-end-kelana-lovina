// // middleware/auth.js
// const jwt = require("jsonwebtoken");

// require("dotenv").config();

// function verifyToken(req, res, next) {
//   const header = req.headers["authorization"];
//   if (!header) return res.status(401).json({ message: "Token required" });

//   const parts = header.split(" ");
//   if (parts.length !== 2 || parts[0] !== "Bearer")
//     return res.status(401).json({ message: "Invalid authorization format" });

//   const token = parts[1];
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     req.user = decoded; // { id: ... }
//     next();
//   });
// }

// module.exports = { verifyToken };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ message: "Token required" });
  }

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  const token = parts[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.userId = decoded.id;
    req.user = decoded;
    next();
  });
}