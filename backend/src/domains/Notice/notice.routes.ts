import express from "express";
import noticeController from "./notice.controller";

const router = express.Router();

// Create a new notice
router.post("/", noticeController.createNotice);

// Update notice
router.put("/:id", noticeController.updateNotice);

// Toggle notice draft status
router.patch("/:id/draft", noticeController.toggleNoticeDraft);

// Delete notice
router.delete("/:id", noticeController.deleteNotice);

// Get all notices with pagination and filters
router.get("/", noticeController.getAllNotices);

export default router;
