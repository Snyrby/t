"use client";
import { NavBarLinks } from "@/constants";
import Image from "next/image";
import NavigationLink from "./navigation-link";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export const NavigationBar = () => {
  const [isDropDown, setIsDropDown] = useState("");
  const [rect, setRect] = useState<string>("");
  const refs = useRef<React.RefObject<HTMLButtonElement>[]>([]);
  const { isOpen } = useModal();
  useEffect(() => {
    isOpen && setIsDropDown("");
  }, [isOpen]);

  const handleClick = (key: string) => {
    isDropDown === key ? setIsDropDown("") : setIsDropDown(key);
  };
   // Initialize the refs array if it hasn't been initialized yet
   if (refs.current.length !== 4) {
    refs.current = Array(4).fill(null).map((_, i) => refs.current[i] || React.createRef<HTMLButtonElement>());
  }

  // const updatePosition = (): void => {
  //   if (dropDownRef.current) {
  //     const rect = dropDownRef.current.getBoundingClientRect();
  //     rect.left.toFixed(2);
  //     setRect(rect.left.toFixed(2));
  //   }
  // };
  

  // useEffect(() => {
  //   window.addEventListener("resize", updatePosition);
  //   updatePosition(); // Initial call to get position

  //   return () => {
  //     window.removeEventListener("resize", updatePosition);
  //   };
  // }, []);

  return (
    <>
      <nav
        className={cn(
          "top-0 bg-white w-full h-[75px] sticky flex border-b",
          isOpen ? "z-0" : "z-40"
        )}
      >
        <div className="max-w-[1400px] mx-auto h-full flexCenter gap-x-4">
          <Image
            src="/Target_Bullseye-Logo_Red.jpg"
            alt="target"
            width={40}
            height={40}
          />
          {NavBarLinks.map((link, index) => (
            <NavigationLink
              key={link.key}
              text={link.text}
              id={link.key}
              onClick={() => handleClick(link.key)}
              isSelected={isDropDown}
              dropDownRef={refs.current[index]}
            />
          ))}
          {/* <Button
            type="button"
            center
            secondary
            className="relative z-30 bg-blue-400"
            onClick={() => handleClick("Categories")}
            refObject={dropDownRef}
          >
            Categories
          </Button>
          <Button
            type="button"
            center
            secondary
            className="relative z-30 bg-blue-400"
            onClick={() => handleClick("Categories")}
            refObject={dropDownRef}
          >
            Categories
          </Button> */}
          <p className="">searchbar</p>
          <p>sign in</p>
          <p>Cart</p>
        </div>
      </nav>
      {isDropDown !== "" && !isOpen && (
        <>
          <div
            className={cn(
              "absolute bg-white z-[35] overflow-hidden transition-all",
              isDropDown !== "" ? "animate-slideDown" : "animate-slideUp"
            )}
            style={{ left: `${rect}px` }}
          >
            test
          </div>
          <button
            className="bg-black fixed left-0 right-0 bottom-0 w-full h-[calc(100vh-75px)] bg-opacity-50 backdrop-blur-sm z-30"
            onClick={() => setIsDropDown("")}
          />
        </>
      )}
    </>
  );
};
