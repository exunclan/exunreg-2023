"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LogoutPage() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    signOut({
      callbackUrl: "/",
    });
  } else if (status === "unauthenticated") {
    redirect("/user/signin");
  } else if (status === "loading") {
    return (
      <div className="w-full flex justify-center items-center text-main text-2xl font-bold">
        Logging Out
      </div>
    );
  }
}
