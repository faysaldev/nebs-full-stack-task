import DashboardLayout from "@/src/components/Dashboard/DashboardLayout";
import React from "react";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
