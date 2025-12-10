import { Request, Response } from "express";
import noticeServices from "./notice.service";

const createNotice = async (req: Request, res: Response) => {
  try {
    const notice = await noticeServices.createNotice(req.body);
    res.status(201).json({
      success: true,
      data: notice,
      message: "Notice created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating notice",
      error: (error as Error).message,
    });
  }
};

const updateNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notice = await noticeServices.updateNotice(id, req.body);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: notice,
      message: "Notice updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating notice",
      error: (error as Error).message,
    });
  }
};

const toggleNoticeDraft = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isDraft } = req.body;

    const notice = await noticeServices.toggleNoticeDraft(id, isDraft);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: notice,
      message: `Notice ${isDraft ? "drafted" : "published"} successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling notice draft status",
      error: (error as Error).message,
    });
  }
};

const deleteNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await noticeServices.deleteNotice(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting notice",
      error: (error as Error).message,
    });
  }
};

const getAllNotices = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      target,
      emp_id,
      emp_name,
      status,
      publish_date,
    } = req.query;

    const filters = {
      target: target as "individuals" | "department" | undefined,
      emp_id: emp_id as string | undefined,
      emp_name: emp_name as string | undefined,
      status: status as "active" | "inactive" | undefined,
      publish_date: publish_date ? new Date(publish_date as string) : undefined,
    };

    const result = await noticeServices.getAllNotices({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filters,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notices",
      error: (error as Error).message,
    });
  }
};

export default {
  getAllNotices,
  deleteNotice,
  toggleNoticeDraft,
  updateNotice,
  createNotice,
};
