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
              name: "About",
              link: "https://exunclan.com",
            },
            {
              name: "Events",
              link: "https://docs.google.com/document/u/6/d/e/2PACX-1vT1q_W-T6QnQLEm5B3onr7QDfLVOa5yglBAsPYbuA0JCHFQmQZDtteOpQNcn5eAm4ovhemXul6kxaII/pub",
            },
            {
              name: "Sign In",
              link: "/user/signin",
            },
            {
              name: "Dashboard",
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
