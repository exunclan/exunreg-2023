"use client"; // Error components must be Client Components

export default function Error() {
  return (
    <div>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="text-main font-bold text-9xl">404</div>
        <div className="text-accent text-xl">
          Go{" "}
          <a href="/">
            <span className="font-medium border-b-2 border-dashed">/home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
