// app/layout.tsx
import { Providers } from "./providers";

import "./globals.css";
import "./fonts.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBAr";

export const metadata = {
  title: "Salawat App",
  description: "App for counting Salawat",
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
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
