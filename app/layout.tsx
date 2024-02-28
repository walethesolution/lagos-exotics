import type { Metadata } from "next";
import { Inter, Albert_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const albert_sans = Albert_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lagos Exotics Menu",
  description: "Menu list for the shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={albert_sans.className}>{children}</body>
    </html>
  );
}
