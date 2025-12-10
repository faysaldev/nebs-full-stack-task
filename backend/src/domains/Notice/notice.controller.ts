import { Request, Response } from "express";
import noticeServices from "./notice.service";
import httpStatus from "http-status";
import { response } from "../../lib/response";
import { handleError } from "../../lib/errorsHandle";

const createNotice = async (req: Request, res: Response) => {
  try {
    const notice = await noticeServices.createNotice(req.body);
    res.status(httpStatus.CREATED).json(
      response({
        message: "Notice created successfully",
        status: "CREATED",
        statusCode: httpStatus.CREATED,
        data: notice,
      })
    );
  } catch (error) {
    const handledError = handleError(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: handledError.message });
  }
};

const updateNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notice = await noticeServices.updateNotice(id, req.body);

    if (!notice) {
      return res.status(httpStatus.NOT_FOUND).json(
        response({
          message: "Notice not found",
          status: "NOT_FOUND",
          statusCode: httpStatus.NOT_FOUND,
          data: {},
        })
      );
    }

    res.status(httpStatus.OK).json(
      response({
        message: "Notice updated successfully",
        status: "OK",
        statusCode: httpStatus.OK,
        data: notice,
      })
    );
  } catch (error) {
    const handledError = handleError(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: handledError.message });
  }
};

const toggleNoticeDraft = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isDraft } = req.body;

    const notice = await noticeServices.toggleNoticeDraft(id, isDraft);

    if (!notice) {
      return res.status(httpStatus.NOT_FOUND).json(
        response({
          message: "Notice not found",
          status: "NOT_FOUND",
          statusCode: httpStatus.NOT_FOUND,
          data: {},
        })
      );
    }

    res.status(httpStatus.OK).json(
      response({
        message: `Notice ${isDraft ? "drafted" : "published"} successfully`,
        status: "OK",
        statusCode: httpStatus.OK,
        data: notice,
      })
    );
  } catch (error) {
    const handledError = handleError(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: handledError.message });
  }
};

const deleteNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await noticeServices.deleteNotice(id);

    if (!deleted) {
      return res.status(httpStatus.NOT_FOUND).json(
        response({
          message: "Notice not found",
          status: "NOT_FOUND",
          statusCode: httpStatus.NOT_FOUND,
          data: {},
        })
      );
    }

    res.status(httpStatus.OK).json(
      response({
        message: "Notice deleted successfully",
        status: "OK",
        statusCode: httpStatus.OK,
        data: { success: true },
      })
    );
  } catch (error) {
    const handledError = handleError(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: handledError.message });
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

    res.status(httpStatus.OK).json(
      response({
        message: "Notices retrieved successfully",
        status: "OK",
        statusCode: httpStatus.OK,
        data: result,
      })
    );
  } catch (error) {
    const handledError = handleError(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: handledError.message });
  }
};

export default {
  getAllNotices,
  deleteNotice,
  toggleNoticeDraft,
  updateNotice,
  createNotice,
};
