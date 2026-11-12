import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NSE Tracker — Investor Intelligence",
  description: "Track Nairobi Securities Exchange market activity and disclosed ownership changes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
