import type { Metadata, Viewport } from "next";
import { Jost, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { PageLoader } from "@/components/page-loader";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  organizationJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
  jsonLd,
} from "@/lib/seo";

/* Jost is the closest open substitute for Futura, Rubis-style geometric headings */
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: "Mukrite Energies Ltd",
  category: "Energy",
  alternates: {
    canonical: "/",
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
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "en_UG",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mukrite Energies — Uganda's gas supply specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MukriteEnergy",
    creator: "@MukriteEnergy",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    "geo.region": "UG",
    "geo.placename": "Kampala",
  },
};

export const viewport: Viewport = {
  themeColor: "#047346",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${nunitoSans.variable} antialiased`}
    >
      <body>
        {/* Structured data: organization, local business, website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd) }}
        />

        <AppProviders>
          <PageLoader />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFab />
        </AppProviders>
      </body>
    </html>
  );
}
