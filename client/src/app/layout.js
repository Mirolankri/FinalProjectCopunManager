import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./custom.css";
import { Layout } from "./components/layout/Layout";
import { UserProvider } from "./components/providers/UserProvider";
import { AlertProvider } from "@/providers/AlertProvider/AlertProvider";
import RouteGuard from "@/providers/AuthProviders/RouteGuard";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" className="h-full bg-gray-100" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full `}
      >
        <AlertProvider>
          <UserProvider>
            {/* <RouteGuard> */}
              <Layout>
                {children}
              </Layout>
            {/* </RouteGuard> */}
          </UserProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
