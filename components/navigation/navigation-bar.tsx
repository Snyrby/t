"use client";

import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { useState } from "react";
import { NavigationLink } from "./navigation-link";
import { NavBarLinks } from "@/constants";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export const NavigationBar = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isHovered, setIsHovered] = useState<number | null>(null);
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
        <div className="hidden md:flex items-center gap-4 transition-all">
          {NavBarLinks.map((link, index) => (
            <Link
              key={link.key}
              href={"/"}
              className="relative group transition-all"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <p className="flex cursor-pointer items-center gap-2 text-black">
                {link.text}
                {isHovered === index && (
                  <ChevronDown size={16} strokeWidth={1} />
                )}
              </p>

              {link.children && (
                <div className="absolute   right-0   -top-10 hidden w-auto  flex-col gap-1   rounded-lg bg-white py-3 shadow-md  transition-all group-hover:flex ">
                  {link.children.map((ch, i) => (
                    <Link
                      key={i}
                      href={ch.href ?? "#"}
                      className=" flex cursor-pointer items-center  py-1 pl-6 pr-8  text-neutral-400 hover:text-black"
                    >
                      {/* item */}
                      <span className="whitespace-nowrap   pl-3 ">
                        {ch.text}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
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
