import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./_context/theme-provider";
import { ReactQueryProvider } from "./react-query-provider";
import { ScrollTop } from "./_components/scroll-top";

export const metadata: Metadata = {
  title: {
    default: "CineVerse — Filmes e séries",
    template: "%s | CineVerse",
  },
  description:
    "Descubra filmes e séries, explore tendências e encontre sua próxima história no CineVerse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <ScrollTop />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
