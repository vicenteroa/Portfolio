import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import "./globals.css";

const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vicente Roa | Full Stack Developer",
  description: "Vicente Roa's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
