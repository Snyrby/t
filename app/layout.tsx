import type { Metadata } from "next";
import { Reddit_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/hooks/use-modal-store";

const inter = Reddit_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Target : Expect More. Pay Less.",
  description: "Target : Expect More. Pay Less",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
        {children}
        </ModalProvider>
      </body>
    </html>
  );
}
