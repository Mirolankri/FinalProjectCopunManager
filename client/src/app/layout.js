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
  applicationName: "CouPoint",
  keywords: ["CouPoint", "Coupons", "Coupons Management", "Coupons Management System", "Coupons Management App", "Coupons Management Tool", "Coupons Management Software", "Coupons Management Platform", "Coupons Management Application", "Coupons Management System","קופון","קופונים","מערכת ניהול קופונים","ניהול קופונים","קופוינט"],
  authors: [{ name: 'Miro Lankri' }],
  creator: 'Miro Lankri',
  publisher: 'Miro Lankri',
  language: 'he',
  type: 'website',
  openGraph:{
    title: "CouPoint | מהפכת ניהול הקופונים מתחילה כאן.",
    description: "קופונים? רק עם נקודת שליטה.",
    type: 'website',
    locale: 'he',
    siteName: 'CouPoint',
    images: [
      {
        url: '/assets/icons/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: 'CouPoint',
      },
    ],
  },
  twitter:{
    title: "CouPoint | מהפכת ניהול הקופונים מתחילה כאן.",
    description: "קופונים? רק עם נקודת שליטה.",
    card: 'summary_large_image',
    images: [
      {
        url: '/assets/icons/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: 'CouPoint',
      },
    ],
  },
  robots:{
    index: true,
    follow: true,
    googleBot:{
      index: true,
      follow: true,
      noimageindex: false,
      
    }
  }
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
