import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import "./globals.css";

const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vicente Roa | Full Stack Developer",
  description:
    "vctroa | Vicente Roa's personal website and portfolio showcasing Full Stack Development",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://vctroa.cl/vctroa_wp.jpg",
    images: [
      {
        url: "/vctroa_wp.jpg",
        width: 1200,
        height: 630,
        alt: "Vicente Roa | Full Stack Developer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="cT9ZON0cv33ocvfwfHPzyhgVNXR2UtwAYGBfeRHEXwg"
      />
      <body className={onest.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Navbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
