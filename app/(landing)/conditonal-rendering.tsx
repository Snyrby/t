"use client";

import { MobileNavBar } from "@/components/navigation/mobile-navigation-bar";
import { NavigationBar } from "@/components/navigation/navigation-bar";
import { usePathname } from "next/navigation";

export default function ConditionalRenderer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <>
      {pathName !== "/login" && (
        <>
          {children}
          <NavigationBar />
          <MobileNavBar />
        </>
      )}
    </>
  );
}
