import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Nav_Bar } from "~/app/_components/ui/Nav_Bar";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Crescent School",
  description: "Crescent School of Gaming & Bartending Stack Rewrite",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex flex-col gap-4">
        <SessionProvider>
          <Nav_Bar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}