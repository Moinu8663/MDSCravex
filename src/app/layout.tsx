import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "../app/components/Nav";
import Footer from "../app/components/Footer";
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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <header className="fixed top-0 left-0 right-0 z-50">
          <Nav />
        </header>

        <main className="flex-grow pt-[64px] pb-[64px] overflow-auto hide-scrollbar">
          {children}
        </main>

        <footer className="fixed bottom-0 left-0 right-0 z-50">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
