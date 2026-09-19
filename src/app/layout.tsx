import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpaceLive — Resume & Cover Letter Generator (ATS-Friendly)",
  description:
    "Aplikasi pembuat CV ATS-friendly dan Cover Letter modern. Ringan, live preview A4, ekspor PDF/PNG/JPG instan, dan auto-save ke browser.",
  keywords: [
    "CV ATS",
    "Resume Builder",
    "Cover Letter Generator",
    "Surat Lamaran Kerja",
    "Template CV BUMN",
    "SpaceLive",
  ],
  authors: [{ name: "SpaceLive Team", url: "https://spacelive.site" }],
  openGraph: {
    title: "SpaceLive — Resume & Cover Letter Generator",
    description: "Buat CV ATS-Friendly dan Surat Lamaran Kerja resmi dalam 5 menit.",
    url: "https://spacelive.site",
    siteName: "SpaceLive",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
