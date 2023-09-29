"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export default function WebsiteLayout({
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
        <SessionProvider>
          <div className="flex-1">{children}</div>
        </SessionProvider>
      </div>
      <Footer />
    </div>
  );
}
