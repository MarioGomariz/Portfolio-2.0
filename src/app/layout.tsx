import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mario Gomariz - Portfolio",
  description: "Portfolio de Mario Gomariz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/profile/profile.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/profile/profile.png" />
        <link rel="apple-touch-icon" href="/images/profile/profile.png" />
        <link rel="shortcut icon" href="/images/profile/profile.png" />
      </head>
      <body
        className={`${sora.variable} ${geistSans.variable} ${geistMono.variable} antialiased dark-bg`}
      >
        {children}
      </body>
    </html>
  );
}
