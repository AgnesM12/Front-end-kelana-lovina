import express from "express";
import { addReview, getReview, getReviewBySlug, likeReview,} 
from "../controllers/reviewController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/reviews", upload.array("images", 10), addReview);
router.post("/like/:id", likeReview);
router.get("/by-slug/:slug", getReviewBySlug);
router.get("/:paketId", getReview);

export default router;
