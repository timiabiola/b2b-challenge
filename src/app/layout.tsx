import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SEO_METADATA } from "@/lib/constants";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { FacebookPixel } from "@/components/analytics/FacebookPixel";

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
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            className: 'bg-[#0B3142] border-2 border-[#00F0FF] text-white shadow-2xl shadow-[#00F0FF]/20',
            style: {
              background: 'linear-gradient(135deg, #0B3142 0%, #2B174C 100%)',
              color: '#FFFFFF',
              border: '2px solid #00F0FF',
              fontSize: '1.1rem',
              padding: '1.25rem',
              minWidth: '400px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 40px rgba(0, 240, 255, 0.3)',
            },
            descriptionClassName: 'text-[#FFF6D6] text-base mt-1 font-medium',
          }}
        />
      </body>
    </html>
  );
}
