"use client";

import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NavigationLink } from "./navigation-link";
import { NavBarLinks } from "@/lib/constants";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DropDown } from "../ui/dropdown/drop-down";

export const NavigationBar = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  const { isOpen } = useModal();

  const handleNavLinkClick = (index: number) => {
    if (isDropdownOpen === null) {
      setIsDropdownOpen(index);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        if (isDropdownOpen === index) {
          setIsDropdownOpen(null);
        } else {
          setIsDropdownOpen(index);
        }
      }, 250);
    }
  };

  useEffect(() => {
    isOpen && setIsDropdownOpen(null);
  }, [isOpen]);

  const handleDropDownClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsDropdownOpen(null);
    }, 250);
  };

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", handleDropDownClose);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDropDownClose);
  }, []); // Empty array ensures that effect is only run on mount

  return (
    <>
      <nav className="top-0 bg-white w-full shadow-md h-[75px] sticky flexCenter gap-x-4 max-w-full mx-auto z-[47]">
        <Image
          src="/Target_Bullseye-Logo_Red.jpg"
          alt="target"
          width={40}
          height={40}
        />
        <div className="hidden xl:flex items-center justify-between gap-x-2">
          {NavBarLinks.map((link, i) => (
            <DropDown
              link={link}
              isClosing={isClosing}
              isDropdownOpen={isDropdownOpen}
              key={link.key}
              linkIndex={i}
              handleNavLinkClick={handleNavLinkClick}
            />
          ))}
        </div>
        <p className="">searchbar</p>
        <p>sign in</p>
        <p>Cart</p>
      </nav>
      {isDropdownOpen !== null && (
        <button
          className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-[40]"
          onClick={handleDropDownClose}
        />
      )}
    </>
  );
};
