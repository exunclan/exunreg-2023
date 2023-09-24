"use client";

import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar
        Links={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Profile",
            link: "/dashboard/profile",
          },
          {
            name: "Manage Teams",
            link: "/dashboard/teams",
          },
          {
            name: "Logout",
            link: "/user/logout",
            background: true,
          },
        ]}
      />

      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}
