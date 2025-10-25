import type { Metadata } from "next";
import { Playfair } from "next/font/google";
import "./globals.css";

const playfair = Playfair({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Elana",
  description: "Jewelry shop with new designs and an awesome community",
  appleWebApp: { title: "Elana" },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.className} antialiased`}>{children}</body>
    </html>
  );
}
