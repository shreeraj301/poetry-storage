import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paper Trail",
  description: "A quiet wall of poems",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
