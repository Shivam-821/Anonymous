import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import NavBarWrapper from "@/components/NavBar";
import Footer from "@/components/Footer";
import HydrationErrorBoundary from "@/app/HydrationErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anonymous Message",
  description:
    "A platform where you can ask questions and share your experience",
};

function CleanupExtensionAttributes() {
  // This will run only on client side after hydration
  if (typeof window !== "undefined") {
    window.requestAnimationFrame(() => {
      document.querySelectorAll("[bis_skin_checked]").forEach((el) => {
        el.removeAttribute("bis_skin_checked");
      });
    });
  }
  return null;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CleanupExtensionAttributes />
          <HydrationErrorBoundary>
            <NavBarWrapper />
            {children}
            <Footer />
          </HydrationErrorBoundary>
        </body>
      </AuthProvider>
    </html>
  );
}
