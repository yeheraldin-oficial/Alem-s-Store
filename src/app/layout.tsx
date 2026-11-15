import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { UserProvider } from "@/lib/user-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alem's Store · Ropa infantil que abraza a tu pequeño",
  description:
    "Tienda virtual de ropa infantil de algodón orgánico e hipoalergénico, hecha con amor en Perú. Body, pijamas, vestidos, polovers y más.",
  keywords: [
    "ropa infantil",
    "ropa de bebé",
    "algodón orgánico",
    "ropa para niños",
    "tienda virtual Perú",
    "Alem's Store",
  ],
  authors: [{ name: "Alem's Store" }],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Alem's Store · Ropa infantil",
    description: "Ropa que abraza a tu pequeño. Algodón orgánico, hipoalergénico, hecho en Perú.",
    url: "https://alems-store.vercel.app",
    siteName: "Alem's Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alem's Store · Ropa infantil",
    description: "Ropa que abraza a tu pequeño. Algodón orgánico, hipoalergénico.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <UserProvider>
          {children}
          <Toaster />
          <SonnerToaster position="top-center" richColors closeButton duration={4000} />
        </UserProvider>
      </body>
    </html>
  );
}
