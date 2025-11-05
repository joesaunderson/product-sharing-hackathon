import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apollo Performance Running Shirt - Premium Athletic Wear",
  description:
    "Advanced moisture-wicking running shirt with breathable mesh panels, flatlock seams, and reflective elements. 5-star rated by 247+ customers. Only £29.99",
  openGraph: {
    title: "Apollo Performance Running Shirt",
    description:
      "Advanced moisture-wicking technology, breathable mesh panels, flatlock seams for comfort. 5★ (247 reviews)",
    images: [
      {
        url: "/product-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apollo Performance Running Shirt - Black athletic shirt with moisture-wicking fabric",
      },
    ],
    siteName: "Apollo Performance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apollo Performance Running Shirt",
    description:
      "Advanced moisture-wicking technology, breathable mesh panels, flatlock seams. 5★ (247 reviews) - £29.99",
    images: ["/product-image.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
