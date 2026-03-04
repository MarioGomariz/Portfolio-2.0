import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Nav from "@/components/ui/nav/Nav";

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
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/profile/profile.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/profile/profile.png"
        />
        <link rel="apple-touch-icon" href="/images/profile/profile.png" />
        <link rel="shortcut icon" href="/images/profile/profile.png" />
      </head>
      <body
        className={`${sora.variable} ${geistSans.variable} ${geistMono.variable} antialiased dark-bg`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {/* Background Gradients - Tron Red Style (Global) */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/30 dark:bg-primary-dark/20 blur-[120px] -z-10 pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 dark:bg-primary/10 blur-[130px] -z-10 pointer-events-none" />

            {children}
            <Nav />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
