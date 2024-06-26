"use client";
import { NavBarLinks } from "@/constants";
import Image from "next/image";
import NavigationLink from "./navigation-link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationBar = () => {
  const [isDropDown, setIsDropDown] = useState("");
  const { isOpen } = useModal();
  useEffect(() => {
    isOpen && setIsDropDown("");
  }, [isOpen]);
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
          {NavBarLinks.map((link) => (
            <NavigationLink
              key={link.key}
              text={link.text}
              id={link.key}
              onClick={() => setIsDropDown(link.key)}
              isSelected={isDropDown}
            />
          ))}
          <p className="">searchbar</p>
          <p>sign in</p>
          <p>Cart</p>
        </div>
      </nav>
      {isDropDown !== "" && !isOpen && (
        <button
          className="bg-black fixed left-0 right-0 bottom-0 w-full h-[calc(100vh-75px)] bg-opacity-50 backdrop-blur-sm z-30"
          onClick={() => setIsDropDown("")}
        />
      )}
    </>
  );
};
