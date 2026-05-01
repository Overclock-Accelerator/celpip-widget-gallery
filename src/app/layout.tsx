import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CELPIP Microsite Infrastructure | Overclock Accelerator",
  description: "Phase 1 exploration: widget gallery and microsite concepts for CELPIP.",
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
