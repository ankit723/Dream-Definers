import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dream Definers - Transforming Learners Into Leaders",
    template: "%s | Dream Definers",
  },
  description: "Dream Definers offers professional soft skills training, communication courses, aviation training, and pre-placement training. Transform your career with expert guidance from experienced trainers.",
  keywords: [
    "soft skills training",
    "communication skills",
    "aviation training",
    "pre-placement training",
    "career development",
    "personality development",
    "leadership training",
    "professional training",
    "skill development",
    "corporate training",
  ],
  authors: [{ name: "Dream Definers" }],
  creator: "Dream Definers",
  publisher: "Dream Definers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dreamdefiners.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://dreamdefiners.com",
    siteName: "Dream Definers",
    title: "Dream Definers - Transforming Learners Into Leaders",
    description: "Professional soft skills training, communication courses, aviation training, and pre-placement training to transform your career.",
    images: [
      {
        url: "/assets/common/logo.png",
        width: 1200,
        height: 630,
        alt: "Dream Definers Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Definers - Transforming Learners Into Leaders",
    description: "Professional soft skills training, communication courses, aviation training, and pre-placement training.",
    images: ["/assets/common/logo.png"],
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
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="contentsquare-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var cs = document.createElement('script');
                cs.src = 'https://t.contentsquare.net/uxa/5cae52c910b64.js';
                cs.async = true;
                document.head.appendChild(cs);
              })();
            `,
          }}
        />      
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Navbar />
        <main className="">
          {children}
        </main>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
