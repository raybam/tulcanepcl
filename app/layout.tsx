import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tulcan Energy - Developing Energy. Delivering Value.",
  description: "Tulcan Energy Exploration and Production Company Limited - A premium upstream energy enterprise committed to unlocking Nigeria's high-value hydrocarbon potential.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased overflow-x-hidden min-h-screen selection:bg-primary-container selection:text-pure-white">
        {children}
      </body>
    </html>
  );
}
