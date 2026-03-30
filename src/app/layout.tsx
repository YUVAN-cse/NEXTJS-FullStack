import type { Metadata } from "next";
import "./globals.css";

import ClientProvider from "@/ClientProvider";

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
    <ClientProvider>
        <body>{children}</body>
      </ClientProvider>
    </html>
  );
}