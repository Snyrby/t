"use client";

import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NavBarLinks } from "@/lib/constants";
import { ChevronUp, CircleUser, Menu, ShoppingCart } from "lucide-react";
import { DropDown } from "@/components/ui/dropdown/drop-down";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavigationBar = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  const { isOpen } = useModal();
  const router = useRouter();

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
      <nav className="top-0 bg-white w-full shadow-sm h-[75px] sticky flexCenter gap-x-4 max-w-full mx-auto z-[47]">
        {/* Image Button */}
        <Button
          type="button"
          center
          secondary
          onClick={() => router.push("/")}
          className="rounded-full sticky min-w-[80px]"
        >
          <Image
            src="/Target_Bullseye-Logo_Red.jpg"
            alt="target"
            width={40}
            height={40}
          />
        </Button>

        {/* DropDown Buttons */}

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
        <Button
          type="button"
          center
          secondary
          className="hover:bg-gray-300/30 xl:hidden"
        >
          <Menu strokeWidth={1.25} />
        </Button>

        {/* Search Bar */}

        <SearchBar />

        {/* Sign in Button  */}
        <div className="group relative">
          <Button
            type="button"
            secondary
            start
            onClick={() => {}}
            className="group-hover:bg-gray-300/30 w-30 gap-x-2"
          >
            <CircleUser size={20} strokeWidth={1.25} />
            <p className="text-base text-black font-light pr-2 whitespace-nowrap tracking-tight">
              Sign in
            </p>
            <ChevronUp
              size={16}
              strokeWidth={1.25}
              className={cn(
                "transform group-hover:scale-100 scale-0 origin-center transition-all duration-[250] rotate-180 ease-in absolute top-[0.8rem] right-0",
                isOpen && "rotate-0 scale-100"
              )}
            />
          </Button>
        </div>
        <Button
          type="button"
          center
          secondary
          className="hover:bg-gray-300/30 sticky"
        >
          <ShoppingCart size={24} strokeWidth={1.25} />
        </Button>
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
