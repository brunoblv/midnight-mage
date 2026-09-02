import type { Metadata } from "next";
import { Domine, Karla } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import "./globals.css";

const domine = Domine({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-domine",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-karla",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "O Mago da Meia Noite",
    template: "%s · O Mago da Meia Noite",
  },
  description:
    "Uma jornada para descobrir quem existe por trás de quem aprendemos a ser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${domine.variable} ${karla.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
