import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SEO_METADATA } from "@/lib/constants";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { FacebookPixel } from "@/components/analytics/FacebookPixel";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://enlightenedinformatics.com'),
  title: SEO_METADATA.title,
  description: SEO_METADATA.description,
  keywords: SEO_METADATA.keywords,
  authors: [{ name: "Timi Abiola" }],
  creator: "Enlightened Informatics",
  publisher: "Enlightened Informatics",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brain-icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enlightenedinformatics.com",
    siteName: "Enlightened Informatics",
    title: SEO_METADATA.title,
    description: SEO_METADATA.description,
    images: [
      {
        url: "/timi-abiola.jpg",
        width: 2870,
        height: 3436,
        alt: "Timi Abiola - AI & Informatics Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_METADATA.title,
    description: SEO_METADATA.description,
    creator: "@timiabiola",
    images: ["/timi-abiola.jpg"],
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
      <body className={`${fraunces.variable} ${jakarta.variable} font-sans antialiased bg-[#120925] text-[#f8f4e9]`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
        )}
        {children}
        <div className="ce-grain" aria-hidden="true" />
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'bg-[#1a0f32] border border-[#e5b94c]/30 text-[#f8f4e9] shadow-2xl',
            style: {
              background: '#1a0f32',
              color: '#f8f4e9',
              border: '1px solid rgba(229, 185, 76, 0.3)',
              fontSize: '1.1rem',
              padding: '1.25rem',
              minWidth: 'min(90vw, 400px)',
              maxWidth: '90vw',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 40px rgba(229, 185, 76, 0.1)',
            },
            descriptionClassName: '!text-[#f8f4e9] !opacity-80 text-base mt-1 font-medium',
          }}
        />
      </body>
    </html>
  );
}
