"use client";

import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NavBarLinks } from "@/lib/constants";
import { Menu } from "lucide-react";
import { DropDown } from "@/components/ui/dropdown/drop-down";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { useRouter } from "next/navigation";

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
      <nav className="top-0 bg-white w-full shadow-md h-[75px] sticky flexCenter gap-x-4 max-w-full mx-auto z-[47]">
        <Button
          type="button"
          center
          secondary
          onClick={() => router.push("/")}
          className="rounded-full"
        >
          <Image
            src="/Target_Bullseye-Logo_Red.jpg"
            alt="target"
            width={40}
            height={40}
          />
        </Button>

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
          className="hover:bg-gray-200/30 xl:hidden"
        >
          <Menu strokeWidth={1.25} />
        </Button>
        <SearchBar />
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
