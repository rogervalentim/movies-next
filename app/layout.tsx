import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_context/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Movies",
  description: "Movies and series from tmdb api"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <body className={poppins.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
