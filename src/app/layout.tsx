import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/lib/providers/query-provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "TaskFlow | Organize seu dia", template: "%s | TaskFlow" },
  description: "Organize suas tarefas, acompanhe seu progresso e tenha mais clareza na rotina.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full"><AppProviders>{children}</AppProviders></body></html>;
}
