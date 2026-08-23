import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import AmbientGlow from "@/components/AmbientGlow";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scottascott.github.io"),

  title: "Scott Wang | Senior Frontend & Full-Stack Engineer",

  description:
    "Senior Software Engineer specializing in React, Next.js, TypeScript, and full-stack development. Building real-time trading platforms, payment systems, digital wallets, and scalable fintech products.",

  keywords: [
    "Scott Wang",
    "Senior Software Engineer",
    "Senior Frontend Engineer",
    "Full-Stack Engineer",
    "Frontend Developer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Fintech Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Real-Time Trading",
    "Trading Platform",
    "Payment Systems",
    "Digital Wallets",
    "Fintech",
  ],

  authors: [
    {
      name: "Scott Wang",
      url: "https://scottascott.github.io",
    },
  ],

  creator: "Scott Wang",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "Scott Wang",
    title: "Scott Wang | Senior Frontend & Full-Stack Engineer",
    description:
      "Senior Software Engineer specializing in React, Next.js, TypeScript, and full-stack development. Building real-time trading platforms, payment systems, digital wallets, and scalable fintech products.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Scott Wang | Senior Frontend & Full-Stack Engineer",
    description:
      "Senior Software Engineer specializing in React, Next.js, TypeScript, and full-stack development for trading, payments, digital wallets, and fintech products.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-bg text-ink-soft">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            var t = localStorage.getItem("theme");
            document.documentElement.setAttribute("data-theme", t === "light" ? "light" : "dark");
          } catch (e) {}`}
        </Script>
        <div className="fixed inset-0 z-0 sm:hidden">
          <AmbientGlow />
        </div>
        <SmoothScroll>
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
