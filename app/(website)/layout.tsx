"use client";

import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function WebsiteLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />

      {children}
    </SessionProvider>
  );
}
