import { AdminApp } from "@/features/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin CMS | Portfolio",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function AdminPage() {
  return <AdminApp />;
}
