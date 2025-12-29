import express from "express";
import { addReview, getReview, getReviewBySlug, likeReview } from "../controllers/reviewController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.array("images", 10), addReview);
router.post("/like/:id", likeReview);
router.get("/:paketId", getReview);
router.get("/by-slug/:slug", getReviewBySlug);

export default router;
