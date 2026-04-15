import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Nicolas Kadir CIFTCI — Portfolio";
const description =
  "Développeur web — Bachelor 3, projets, parcours, compétences et contact. Recherche d’alternance (Mastère Data Engineering & IA, Efrei).";

/** Google Search Console — balise meta google-site-verification */
const GOOGLE_SITE_VERIFICATION =
  "PFlht7lmzANn-PmpcrU8G-ZPHqMxqzpkuDBvAB-7TxM";

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();

  return {
    metadataBase: new URL(base),
    title,
    description,
    alternates: { canonical: "/" },
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/icon.png", type: "image/png" }],
    },
    openGraph: {
      title,
      description,
      url: base,
      siteName: "Nicolas Kadir CIFTCI",
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-fuchsia-400/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
