"use client";

import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-accent text-lg font-medium m-3">
      Loading...
      <AiOutlineLoading className="animate-spin m-5" />
    </div>
  );
}
