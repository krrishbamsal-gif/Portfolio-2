import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KRRISH | Portfolio",
  description:
    "Cinematic personal portfolio of KRRISH — Aspiring Software Developer, Web Developer, AI & Technology Enthusiast. BCA student at Amity University Rajasthan, Jaipur.",
  keywords: [
    "KRRISH",
    "portfolio",
    "web developer",
    "software developer",
    "BCA",
    "Amity University",
    "Jaipur",
  ],
  authors: [{ name: "KRRISH" }],
  openGraph: {
    title: "KRRISH | Portfolio",
    description:
      "Cinematic personal portfolio of KRRISH — Aspiring Software Developer, Web Developer, AI & Technology Enthusiast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
