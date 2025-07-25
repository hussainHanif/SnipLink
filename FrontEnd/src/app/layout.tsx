import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnipLink",
  description: "Share code via links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
