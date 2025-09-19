import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { TeamsProvider } from "@/context/TeamsProvider";
import { DownloadProvider } from "@/context/DownloadProvider";

export const metadata: Metadata = {
  title: "MONOHOBI",
  description: "MONOHOBI The Game",
  icons: {
    icon: "/cars/Monohobi.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={` antialiased`}>
        <TeamsProvider>
          <DownloadProvider>
            {children}
            <GoogleAnalytics gaId="G-RH5SPTZ6TY" />
          </DownloadProvider>
        </TeamsProvider>
      </body>
    </html>
  );
}
