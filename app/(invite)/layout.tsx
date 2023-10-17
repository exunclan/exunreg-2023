"use client";

import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function InviteLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Navbar
          Links={[
            {
              name: "Home",
              link: "/invite",
            },
            {
              name: "Events",
              link: "/invite/events",
            },
            {
              name: "Schedule",
              link: "https://exun.co/schedule",
            },
            {
              name: "Code of Conduct",
              link: "https://exun.co/code",
            },
            {
              name: "Register",
              link: "/dashboard",
              background: true,
            },
          ]}
        />

        <SessionProvider>
          <div className="flex-1">{children}</div>
        </SessionProvider>
      </div>
    </div>
  );
}
