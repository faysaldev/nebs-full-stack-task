"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Eye,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Calendar,
  X,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

// Define interfaces
export interface CreateNoticeData {
  id: string;
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

export interface NoticeFilters {
  target?: "individuals" | "department";
  emp_id?: string;
  emp_name?: string;
  status?: "active" | "inactive";
  publish_date?: Date;
}

function NoticeDashboardPage() {
  // Sample data for notices
  const [notices, setNotices] = useState<CreateNoticeData[]>([
    {
      id: "1",
      target: "department",
      title: "Annual Performance Review",
      emp_id: "EMP001",
      emp_name: "John Doe",
      emp_position: "Software Engineer",
      notice_type: "Policy",
      publish_date: new Date("2024-12-01"),
      notice_body:
        "This is a notice about the annual performance review process.",
      document: "",
      isDraft: false,
      status: "active",
    },
    {
      id: "2",
      target: "individuals",
      title: "Meeting Reschedule",
      emp_id: "EMP002",
      emp_name: "Jane Smith",
      emp_position: "Marketing Manager",
      notice_type: "Event",
      publish_date: new Date("2024-11-28"),
      notice_body: "The meeting has been rescheduled to next week.",
      document: "",
      isDraft: false,
      status: "active",
    },
    {
      id: "3",
      target: "department",
      title: "New Policy Announcement",
      emp_id: "EMP003",
      emp_name: "Robert Johnson",
      emp_position: "HR Director",
      notice_type: "Policy",
      publish_date: new Date("2024-12-05"),
      notice_body: "Please read the new company policy regarding remote work.",
      document: "",
      isDraft: true,
      status: "inactive",
    },
  ]);

  const [filters, setFilters] = useState<NoticeFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate active and draft counts
  const activeCount = notices.filter(
    (n) => !n.isDraft && n.status === "active"
  ).length;
  const draftCount = notices.filter((n) => n.isDraft).length;

  // Function to handle filter changes
  const handleFilterChange = (key: keyof NoticeFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Function to reset filters
  const resetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  // Filter notices based on current filters
  const filteredNotices = notices.filter((notice) => {
    if (filters.target && notice.target !== filters.target) return false;
    if (
      filters.emp_id &&
      !notice.emp_id.toLowerCase().includes(filters.emp_id.toLowerCase())
    )
      return false;
    if (
      filters.emp_name &&
      !notice.emp_name.toLowerCase().includes(filters.emp_name.toLowerCase())
    )
      return false;
    if (filters.status && notice.status !== filters.status) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotices = filteredNotices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Function to toggle notice status
  const toggleNoticeStatus = (id: string) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id
          ? {
              ...notice,
              status: notice.status === "active" ? "inactive" : "active",
            }
          : notice
      )
    );
  };

  // Function to get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, Asif
          </h1>
          <p className="text-gray-600">Welcome back to your dashboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <Input type="text" placeholder="Search..." className="pl-10 w-64" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="text-gray-700">Asif</span>
          </div>
        </div>
      </div>

      {/* Notice Management Section */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-900 mr-4">
            Notice Management
          </h2>
          <div className="flex space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">
                Active: {activeCount}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-600">Draft: {draftCount}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <Button variant="outline">All Draft Notice</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Notice
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Filter by Department/Individual
              </label>
              <Select
                value={filters.target || undefined}
                onValueChange={(value) =>
                  handleFilterChange(
                    "target",
                    value as "individuals" | "department"
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="department">Department</SelectItem>
                  <SelectItem value="individuals">Individual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Search by Employee ID or Name
              </label>
              <Input
                placeholder="Search..."
                value={filters.emp_name || ""}
                onChange={(e) => handleFilterChange("emp_name", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Filter by Status
              </label>
              <Select
                value={filters.status || undefined}
                onValueChange={(value) =>
                  handleFilterChange("status", value as "active" | "inactive")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Published Date
              </label>
              <div className="flex">
                <Input
                  type="date"
                  value={
                    filters.publish_date
                      ? (filters.publish_date as unknown as string)
                      : ""
                  }
                  onChange={(e) =>
                    handleFilterChange(
                      "publish_date",
                      e.target.value ? new Date(e.target.value) : undefined
                    )
                  }
                  className="pr-8"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <Calendar className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="w-full"
              >
                <X className="mr-2 h-4 w-4" /> Reset Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notice Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <input type="checkbox" />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Notice Type</TableHead>
                <TableHead>Department/Individual</TableHead>
                <TableHead>Published On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedNotices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell className="font-medium">{notice.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        notice.notice_type === "Policy"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {notice.notice_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {notice.target === "department"
                      ? "Department"
                      : "Individual"}
                  </TableCell>
                  <TableCell>{notice.emp_name}</TableCell>
                  <TableCell>
                    {notice.publish_date.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        notice.status === "active" ? "default" : "destructive"
                      }
                    >
                      {notice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => toggleNoticeStatus(notice.id)}
                          >
                            {notice.status === "active"
                              ? "Unpublish"
                              : "Publish"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="mt-6 flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default NoticeDashboardPage;
