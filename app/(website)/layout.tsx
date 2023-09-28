"use client";

import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function WebsiteLayout({
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
            name: "Events",
            link: "/events",
          },
          {
            name: "Contact",
            link: "/contact",
          },
          {
            name: "Register",
            link: "/dashboard",
            background: true,
          },
        ]}
      />
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}
