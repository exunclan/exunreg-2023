import React from "react";

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex flex-row justify-center items-center">{children}</div>
  );
}

export function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center">{children}</div>
  );
}
