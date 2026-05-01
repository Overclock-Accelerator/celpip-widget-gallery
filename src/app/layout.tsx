import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CELPIP Widget Gallery | Overclock Accelerator",
  description: "Component library exploration for CELPIP marketing microsites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
