import React from "react";

export function Row({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-row justify-center items-center ${className}`}>
      {children}
    </div>
  );
}

export function Column({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      {children}
    </div>
  );
}
