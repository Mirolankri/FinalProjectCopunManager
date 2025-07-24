import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./custom.css";
import { Layout } from "./components/layout/Layout";
import { UserProvider } from "./components/providers/UserProvider";
import { AlertProvider } from "@/providers/AlertProvider/AlertProvider";
import RouteGuard from "@/providers/AuthProviders/RouteGuard";
import { ModalProvider } from "@/providers/ModalProvider/ModalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CouPoint | מהפכת ניהול הקופונים מתחילה כאן.",
  description: "קופונים? רק עם נקודת שליטה.",
  icons: {
    apple: "/assets/icons/apple-touch-icon.png",
  },
  openGraph: {
    title: "CouPoint | מהפכת ניהול הקופונים מתחילה כאן.",
    description: "קופונים? רק עם נקודת שליטה.",
    url: "https://CouPoint.me",
    siteName: "CouPoint",
    images: [
      {
        url: "/assets/icons/apple-touch-icon.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    title: "CouPoint | מהפכת ניהול הקופונים מתחילה כאן.",
    description: "קופונים? רק עם נקודת שליטה.",
    card: "summary_large_image",
    images: [
      {
        url: "/assets/icons/apple-touch-icon.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" className="h-full" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <AlertProvider>
            <UserProvider>
              <ModalProvider>
              {/* <RouteGuard> */}
                <Layout>
                  {children}
                </Layout>
            {/* </RouteGuard> */}
            </ModalProvider>
          </UserProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
