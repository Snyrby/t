import React, { useRef } from "react";
import { FinanceBar } from "@/components/finance-bar";
import { NavigationBar } from "@/components/navigation-bar";
import { useModal } from "@/hooks/use-modal-store";

export default function Home() {
  return (
    <div className="bg-white h-full">
      <FinanceBar />
      <NavigationBar />
      <div className="h-full">test1</div>
      <div className="">test</div>
    </div>
  );
}
