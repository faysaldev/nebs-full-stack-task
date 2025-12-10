export interface CreateNoticeData {
  target: "individuals" | "department";
  title: string;
  emp_id: string;
  emp_name: string;
  emp_position: string;
  notice_type: string;
  publish_date: Date;
  notice_body: string;
  description?: string;
  document: string;
  isDraft: boolean;
  status: "active" | "inactive";
}

export interface UpdateNoticeData {
  target?: "individuals" | "department";
  title?: string;
  emp_id?: string;
  emp_name?: string;
  emp_position?: string;
  notice_type?: string;
  publish_date?: Date;
  notice_body?: string;
  description?: string;
  document?: string;
  status?: "active" | "inactive";
}

export interface NoticeFilters {
  target?: "individuals" | "department";
  emp_id?: string;
  emp_name?: string;
  status?: "active" | "inactive";
  publish_date?: Date;
}

export interface NoticeQueryOptions {
  page?: number;
  limit?: number;
  filters?: NoticeFilters;
}
