import "./globals.css";
import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import Providers from "@/components/Providers";

const chivo = Chivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exun 2023",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={chivo.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
