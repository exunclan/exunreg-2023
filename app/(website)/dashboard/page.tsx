"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const { data: session, status } = useSession();

  if (status === "authenticated") return <>Dashboard</>;
  else if (status === "loading") return <>loading</>;
  else redirect("/user/signin");
}
