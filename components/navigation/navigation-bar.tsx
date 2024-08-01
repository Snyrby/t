"use client";

import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { useState } from "react";
import { NavigationLink } from "./navigation-link";
import { NavBarLinks } from "@/constants";

export const NavigationBar = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const { isOpen } = useModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="top-0 bg-white w-full shadow-md h-[75px] sticky flexCenter gap-x-4 border-b max-w-full mx-auto z-[47]">
        {/* <div className="max-w-[1400px] mx-auto h-full flexCenter gap-x-4 bg-red-600"> */}
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
            onClick={() => setIsDropdownOpen(true)}
          />
        ))}
        <p className="">searchbar</p>
        <p>sign in</p>
        <p>Cart</p>
      </nav>
      {isDropdownOpen && (
        <>
          <div className="absolute left-0 top-40 mt-2 bg-white text-black rounded shadow-lg w-full md:w-auto animate-slideDown z-[47]">
            test
          </div>
          <button
            className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-[46]"
            onClick={onClose}
          />
        </>
      )}
    </>
  );
};
