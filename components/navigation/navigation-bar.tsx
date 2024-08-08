"use client";

import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NavigationLink } from "./navigation-link";
import { NavBarLinks } from "@/constants";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const NavigationBar = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  const { isOpen } = useModal();
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      <nav className="top-0 bg-white w-full shadow-md h-[75px] sticky flexCenter gap-x-4 border-b max-w-full mx-auto z-[47]">
        {/* <div className="max-w-[1400px] mx-auto h-full flexCenter gap-x-4 bg-red-600"> */}
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
                className="group-hover:bg-gray-200/30 ml-2"
                fullWidth
              >
                <p className="text-base pr-2">{link.text}</p>
                {isDropdownOpen === null && (
                  <ChevronDown
                    size={16}
                    strokeWidth={1.25}
                    className={cn(
                      "hidden group-hover:block absolute top-[0.8rem] right-0 animate-slideDown origin-top",
                      isDropdownOpen === i &&
                        "rotate-180 ease-in transition-all block"
                    )}
                  />
                )}
                {/* {isDropdownOpen == i && (
                  <ChevronUp
                    size={16}
                    strokeWidth={1.25}
                    className="absolute top-[0.8rem] right-0 transition-all"
                  />
                )} */}
                {/* <ChevronDown size={16} strokeWidth={1.25} /> */}
              </Button>
              {link.children && isDropdownOpen === i && (
                <div
                  className={cn(
                    isDropdownOpen === i && "animate-slideDown origin-top",
                    isClosing === true && "animate-slideUp",
                    "absolute bg-white top-14 flex flex-col w-auto"
                  )}
                >
                  {link.children.map((sublink, i) => (
                    <Link key={i} href={sublink.href}>
                      {sublink.text}
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
          className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-[46]"
          onClick={handleDropDownClose}
        />
      )}
    </>
  );
};

{
  /* <div className="hidden md:flex items-center gap-4 transition-all">
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
                {/* item */
}
//               <span className="whitespace-nowrap   pl-3 ">
//                 {ch.text}
//               </span>
//             </Link>
//           ))}
//         </div>
//       )}
//     </Link>
//   ))}
// </div> */}
