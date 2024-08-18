import { Metadata } from "next";
import { Providers } from "./providers";
import { AuthProvider } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import "./globals.css";
import "./fonts.css";
import { RegisterSW } from "@/components/RegisterSW";
import { NotificationProvider } from "@/contexts/NotificationContext";

export const metadata: Metadata = {
  title: "Salawat App",
  description: "An app for reciting Salawat",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Salawat App",
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <NotificationProvider>
              <Navbar />
              {children}
              <Footer />
            </NotificationProvider>
          </AuthProvider>
        </Providers>
        <RegisterSW />
      </body>
    </html>
  );
}
