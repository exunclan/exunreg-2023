"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
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

        <SessionProvider>
          {/* <div className="flex-1">{children}</div> */}
          <div className="flex-1">
            <div className="text-3xl text-main m-3 font-bold">
              Registrations closed.
            </div>
            <div className="text-xl text-accent m-3 font-bold">
              If you wish to make any changes to your registration, please email
              us at exun@dpsrkp.net.
            </div>
          </div>
        </SessionProvider>
      </div>
      <Footer />
    </div>
  );
}
