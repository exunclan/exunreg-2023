"use client";

import { BiError } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="h-[50vh] w-full flex flex-col justify-center items-center text-red-500 text-3xl font-bold m-3">
      <BiError className="m-5" />
      An unexpected error was encountered! Please try again in a few minutes.
    </div>
  );
}
