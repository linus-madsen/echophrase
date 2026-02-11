import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EchoPhrase - AI Shadowing Workouts for Language Learning",
  description: "Master pronunciation in Spanish, French, German, Italian, Portuguese, and Japanese with AI-powered shadowing practice. Free, no signup required.",
  keywords: "language learning, pronunciation practice, shadowing, speak languages, AI language tutor",
  openGraph: {
    title: "EchoPhrase - AI Shadowing Workouts",
    description: "Master pronunciation with AI-powered shadowing practice",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
