"use client";

import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="w-full flex flex-row h-10 justify-center items-center text-main text-2xl font-bold m-3">
      <AiOutlineLoading className="animate-spin mx-3" />
      Loading...
    </div>
  );
}
