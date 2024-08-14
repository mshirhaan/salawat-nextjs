// app/layout.tsx
import Head from "next/head";
import { Providers } from "./providers";

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
