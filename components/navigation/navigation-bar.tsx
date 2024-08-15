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
        <div className="flexBetween gap-x-2">
          {NavBarLinks.map((link, i) => (
            <div className="relative w-auto group" key={link.key}>
              <Button
                type="button"
                secondary
                start
                onClick={() => handleNavLinkClick(i)}
                className="group-hover:bg-gray-200/30"
                fullWidth
              >
                <p className="text-base pr-2">{link.text}</p>
                <ChevronUp
                  size={16}
                  strokeWidth={1.25}
                  className={cn(
                    "transform group-hover:scale-100 scale-0 origin-center transition-all duration-[250] rotate-180 ease-in absolute top-[0.8rem] right-0",
                    isDropdownOpen === i && "rotate-0 scale-100"
                  )}
                />
              </Button>
              {link.children && isDropdownOpen === i && (
                <div
                  className={cn(
                    isDropdownOpen === i && "animate-slideDown origin-top",
                    isClosing === true && "animate-slideUp",
                    "absolute bg-white top-[3.605rem] flex flex-col w-80 border-t px-4 max-h-[36rem] overflow-y-auto rounded-br-md rounded-bl-md custom-scrollbar"
                  )}
                >
                  {i === 0 && (
                    <div className="min-h-16 border-b flexStart">
                      <h3 className="text-lg base font-semibold">
                        All Categories
                      </h3>
                    </div>
                  )}
                  {link.children.map((sublink, i) => (
                    <Link key={i} href={sublink.href}>
                      <div className="w-full h-10 border-b flexStart">
                        <p className="text-base whitespace-nowrap">
                          {sublink.text}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
