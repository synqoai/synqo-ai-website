import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://synqoai.com"),

  title: {
    default: "Synqo AI | AI Software & Automation",
    template: "%s | Synqo AI",
  },

  description:
    "Synqo AI builds practical AI software, automation tools, SaaS products and intelligent business solutions.",

  keywords: [
    "Synqo AI",
    "AI software",
    "AI automation",
    "SaaS products",
    "business automation",
    "AI tools",
    "Canadian AI startup",
  ],

  authors: [
    {
      name: "Synqo AI",
      url: "https://synqoai.com",
    },
  ],

  creator: "Synqo AI",
  publisher: "Synqo AI",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://synqoai.com",
    siteName: "Synqo AI",
    title: "Synqo AI | AI Software & Automation",
    description:
      "Practical AI software, automation tools and SaaS products built for modern businesses.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Synqo AI",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Synqo AI | AI Software & Automation",
    description:
      "Practical AI software, automation tools and SaaS products built for modern businesses.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>

      <GoogleAnalytics gaId="G-71WW2Q58VY" />

      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xqbh5yo015");
        `}
      </Script>
    </html>
  );
}
