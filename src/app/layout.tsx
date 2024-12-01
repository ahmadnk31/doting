import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Doting - Share and Discover Amazing Recipes",
  description: "Doting is a recipe sharing platform where food lovers can discover, share, and save their favorite recipes from around the world.",
  keywords: "recipes, cooking, food sharing, meal planning, cooking community, food blog",
  authors: [{ name: "Ahmadullah Nekzad" }],
  creator: "Ahmadullah Nekzad",
  publisher: "Doting",
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Doting - Share and Discover Amazing Recipes",
    description: "Join the community of food lovers. Share recipes, discover new dishes, and connect with fellow cooking enthusiasts.",
    url: "https://yourdomain.com",
    siteName: "Doting",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Doting - Recipe Sharing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doting - Share and Discover Amazing Recipes",
    description: "Join the community of food lovers. Share recipes, discover new dishes, and connect with fellow cooking enthusiasts.",
    creator: "@yourhandle",
    images: ["https://yourdomain.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-verification-code",
    },
  },
};

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
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
