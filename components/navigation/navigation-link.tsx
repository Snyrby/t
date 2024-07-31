"use client";

import { Button } from "@/components/ui/button";
import { DropDownLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { RefObject, useMemo } from "react";

type NavigationLink = {
  text: string;
  onClick: () => void;
  isSelected?: string;
  id: string;
  links: { text: string; id: string }[];
  isClosing?: boolean;
  dropDownRef: RefObject<HTMLButtonElement>;
};

const NavigationLink = ({
  text,
  onClick,
  isSelected,
  id,
  links,
  isClosing,
  dropDownRef,
}: // dropDownRef,
NavigationLink) => {
  // console.log(id);
  // console.log(isSelected);
  // const links = useMemo(() => {
  //   return DropDownLinks.filter((link) => link.id === id);
  // }, [isSelected]);

  return (
    // <div className="relative">
    <>
      <Button
        type="button"
        center
        secondary
        className="bg-blue-400"
        onClick={onClick}
        refObject={dropDownRef}
        >
        {text}
      </Button>
      {isSelected === text && (
        <div
        className={cn(
            "absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-full md:w-auto z-10",
            isSelected !== "" && !isClosing && "animate-slideDown",
            isClosing && "animate-slideUp"
          )}
          >
          <ul className="py-2">
            {links.map((link) => (
              <li key={link.id} className="px-4 py-2 hover:bg-gray-200">
                {link.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      </>
    // </div>
  );
};

export default NavigationLink;

{
  /* <nav className="bg-gray-800 p-4">
      <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        {['Home', 'Services', 'About', 'Contact'].map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="relative text-white cursor-pointer"
          >
            {item}
            {dropdown === index && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-full md:w-auto">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-200">Option 1</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Option 2</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Option 3</li>
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}; */
}
