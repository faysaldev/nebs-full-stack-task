import {
  CreateNoticeData,
  NoticeQueryOptions,
  UpdateNoticeData,
} from "../../types/types";
import Notice, { Notices } from "./notice.model";

const createNotice = async (data: CreateNoticeData): Promise<Notices> => {
  const notice = new Notice(data);
  return await notice.save();
};

const updateNotice = async (
  noticeId: string,
  data: UpdateNoticeData
): Promise<Notices | null> => {
  return await Notice.findByIdAndUpdate(noticeId, data, { new: true });
};

const toggleNoticeDraft = async (
  noticeId: string,
  isDraft: boolean
): Promise<Notices | null> => {
  return await Notice.findByIdAndUpdate(noticeId, { isDraft }, { new: true });
};

const deleteNotice = async (noticeId: string): Promise<boolean> => {
  const result = await Notice.findByIdAndDelete(noticeId);
  return !!result;
};

const getAllNotices = async ({
  page = 1,
  limit = 10,
  filters = {},
}: NoticeQueryOptions): Promise<{
  notices: Notices[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  const query: any = {};

  // Apply filters
  if (filters.target) {
    query.target = filters.target;
  }

  if (filters.emp_id) {
    query.emp_id = { $regex: filters.emp_id, $options: "i" };
  }

  if (filters.emp_name) {
    query.emp_name = { $regex: filters.emp_name, $options: "i" };
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.publish_date) {
    query.publish_date = {
      $gte: new Date(new Date(filters.publish_date).setHours(0, 0, 0, 0)),
      $lte: new Date(new Date(filters.publish_date).setHours(23, 59, 59, 999)),
    };
  }

  const skip = (page - 1) * limit;
  const total = await Notice.countDocuments(query);

  const notices = await Notice.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(total / limit);

  return {
    notices,
    total,
    page,
    limit,
    totalPages,
  };
};

export default {
  getAllNotices,
  deleteNotice,
  toggleNoticeDraft,
  updateNotice,
  createNotice,
};
