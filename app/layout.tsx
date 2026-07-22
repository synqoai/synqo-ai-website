import type { Metadata } from "next";
import "./globals.css";

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
    </html>
  );
}
