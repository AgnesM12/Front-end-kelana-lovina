import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kelana_lovina",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("❌ DB CONNECT ERROR:", err);
        return;
    }
    console.log("✅ Database connected");
});

export default db;
