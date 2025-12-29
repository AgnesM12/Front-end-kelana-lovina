import db from "../config/db.js";

export const createReview = (reviewData, callback) => {
    const query = `INSERT INTO review (user_data, paket_id, rating, text, images, tanggal) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        reviewData.user_data,
        reviewData.paket_id,
        reviewData.rating,
        reviewData.text,
        reviewData.images,
        reviewData.tanggal
    ];

    db.query(query, values, callback);
};
