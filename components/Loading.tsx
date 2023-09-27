"use client";

import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="h-[50vh] w-full flex flex-row justify-center items-center text-main text-3xl font-bold m-3">
      <AiOutlineLoading className="animate-spin m-5" />
      Loading...
    </div>
  );
}
