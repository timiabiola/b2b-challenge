import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SEO_METADATA } from "@/lib/constants";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { FacebookPixel } from "@/components/analytics/FacebookPixel";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://enlightenedinformatics.com'),
  title: SEO_METADATA.title,
  description: SEO_METADATA.description,
  keywords: SEO_METADATA.keywords,
  authors: [{ name: "Timi Abiola" }],
  creator: "Enlightened Informatics",
  publisher: "Enlightened Informatics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enlightenedinformatics.com",
    siteName: "Enlightened Informatics",
    title: SEO_METADATA.title,
    description: SEO_METADATA.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Enlightened Informatics - Transform Your Business with AI & Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_METADATA.title,
    description: SEO_METADATA.description,
    creator: "@timiabiola",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#0B3142] text-white`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
        )}
        <Header />
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'bg-[#0B3142] border border-[#3EC6FF]/30 text-white',
            style: {
              background: '#0B3142',
              color: '#FFFFFF',
              border: '1px solid rgba(62, 198, 255, 0.3)',
            },
          }}
        />
      </body>
    </html>
  );
}
