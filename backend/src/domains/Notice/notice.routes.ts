import express from "express";
import noticeController from "./notice.controller";
import { authorizedMiddleware } from "../../middlewares/authorized.middleware";

const router = express.Router();

// Create a new notice
router.post("/", authorizedMiddleware, noticeController.createNotice);

// Update notice
router.put("/:id", authorizedMiddleware, noticeController.updateNotice);

// Toggle notice draft status
router.patch(
  "/:id/draft",
  authorizedMiddleware,
  noticeController.toggleNoticeDraft
);

// Delete notice
router.delete("/:id", authorizedMiddleware, noticeController.deleteNotice);

// Get all notices with pagination and filters
router.get("/", authorizedMiddleware, noticeController.getAllNotices);

export default router;
