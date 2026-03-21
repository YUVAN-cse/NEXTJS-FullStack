import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "First Next Full stack App",
  description: "my first next full stack app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
