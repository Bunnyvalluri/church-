import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import AIChat from "@/components/ai/AIChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kingdom of Christ Ministries | Hyderabad",
  description: "Welcome to Kingdom of Christ Ministries - A place of worship, prayer, and community in Jeedimetla, Hyderabad. Join us for services, events, and spiritual growth.",
  keywords: ["church", "ministry", "worship", "prayer", "Hyderabad", "Jeedimetla", "Kingdom of Christ"],
  authors: [{ name: "Kingdom of Christ Ministries" }],
  openGraph: {
    title: "Kingdom of Christ Ministries",
    description: "A place of worship and community in Hyderabad",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <AIChat />
        </Providers>
      </body>
    </html>
  );
}
