"use client";

import { BiError } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="h-[50vh] w-full flex flex-col justify-center items-center text-center text-red-500 text-lg font-semibold m-3">
      An unexpected error was encountered! Please try again in a few minutes.
      <BiError className="m-5 text-4xl" />
    </div>
  );
}
