import {
  CreateNoticeData,
  NoticeQueryOptions,
  UpdateNoticeData,
} from "../../types/types";
import Notice, { Notices } from "./notice.model";
import redis from "../../config/redis";

const createNotice = async (data: CreateNoticeData): Promise<Notices> => {
  const notice = new Notice(data);
  const savedNotice = await notice.save();

  // Clear cache when creating new notice
  await redis.del("notices:*");

  return savedNotice;
};

const updateNotice = async (
  noticeId: string,
  data: UpdateNoticeData
): Promise<Notices | null> => {
  const updatedNotice = await Notice.findByIdAndUpdate(noticeId, data, {
    new: true,
  });

  if (updatedNotice) {
    // Clear cache when updating notice
    await redis.del("notices:*");
  }

  return updatedNotice;
};

const toggleNoticeDraft = async (
  noticeId: string,
  isDraft: boolean
): Promise<Notices | null> => {
  const updatedNotice = await Notice.findByIdAndUpdate(
    noticeId,
    { isDraft },
    { new: true }
  );

  if (updatedNotice) {
    // Clear cache when toggling draft status
    await redis.del("notices:*");
  }

  return updatedNotice;
};

const deleteNotice = async (noticeId: string): Promise<boolean> => {
  const result = await Notice.findByIdAndDelete(noticeId);

  if (result) {
    // Clear cache when deleting notice
    await redis.del("notices:*");
  }

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
  // Create a cache key based on all query parameters
  const filterString = JSON.stringify(filters);
  const cacheKey = `notices:page:${page}:limit:${limit}:filters:${filterString}`;

  try {
    // Try to get cached data
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error("Redis cache error:", error);
  }

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

  const result = {
    notices,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  try {
    // Cache the result for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, JSON.stringify(result));
  } catch (error) {
    console.error("Redis cache set error:", error);
  }

  return result;
};

export default {
  getAllNotices,
  deleteNotice,
  toggleNoticeDraft,
  updateNotice,
  createNotice,
};
