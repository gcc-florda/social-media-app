import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); // all the posts in db
router.get("/:userId/posts", verifyToken, getUserPosts); // only user posts

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router; 