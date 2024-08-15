"use client";

import { Button } from "@/components/ui/button";
import { DropDownLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { RefObject, useMemo } from "react";

type NavigationLink = {
  text: string;
  onClick: () => void;
};

export const NavigationLink = ({ text, onClick }: NavigationLink) => {
  return (
    // <div className="relative">
    <>
      <Button
        type="button"
        center
        secondary
        className="bg-blue-400 z-[5]"
        onClick={onClick}
      >
        {text}
      </Button>
    </>
    // </div>
  );
};

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
