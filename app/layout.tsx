import type { Metadata } from "next";
import { Reddit_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-context";
import { ModalProviderGroup } from "@/providers/modal-provider";
import { useLocationCookie } from "@/hooks/use-location-cookie";
import { FinanceBar } from "@/components/finance/finance-bar";
import ConditionalRenderer from "./(landing)/conditonal-rendering";
import AuthProvider from "@/providers/auth-provider";

const inter = Reddit_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Target : Expect More. Pay Less.",
  description: "Target : Expect More. Pay Less",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const zipCode = await useLocationCookie();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <ConditionalRenderer>
              <ModalProviderGroup />
              <FinanceBar zipCode={zipCode} />
            </ConditionalRenderer>
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
