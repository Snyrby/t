"use client";

import { useScroll } from "@/hooks/use-scroll";
import { ElementRef, useRef } from "react";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { FinanceBar } from "@/components/finance-bar";
import { NavigationBar } from "@/components/navigation-bar";

export default function Home() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const isInView = useScroll(targetRef);
  return (
    <div className="bg-white h-full">
      <FinanceBar
        targetRef={targetRef}
      />
      <NavigationBar 
        isInView={isInView}
      />
      <div className="h-full">test1</div>
      <div className="">test</div>
    </div>
  );
}
