"use client";

import { useSearchParams } from "next/navigation";

export default function UserVerification() {
  const searchParams = useSearchParams();

  const success = searchParams.get("success");

  return (
    <div className="w-full flex justify-center items-center text-2xl text-main font-bold">
      {success === "true" && "Verification Successful!"}
      {success === "false" && "The verification token is invalid."}
      {success === "expired" &&
        "The verification link has expired. Please email us at exun@dpsrkp.net for support."}
    </div>
  );
}
