// app/layout.tsx
import Head from "next/head";
import { Providers } from "./providers";

import "./globals.css";

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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
