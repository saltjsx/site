import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Sidebar from "./components/Sidebar";
import { Agentation } from "agentation";
import { Databuddy } from "@databuddy/sdk/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "salt",
  description: "Personal site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Sidebar />
          <main className="ml-28 min-h-screen">
            {children}
          </main>
          {process.env.NODE_ENV === "development" && <Agentation />}
          <Databuddy clientId="rALU52_genirbSWfxdhia" trackWebVitals trackErrors />
        </ThemeProvider>
      </body>
    </html>
  );
}
