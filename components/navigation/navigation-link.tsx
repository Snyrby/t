"use client";

import { Button } from "@/components/ui/button";
import { DropDownLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type NavigationLink = {
  text: string;
  onClick: () => void;
  isSelected?: string;
  id: string;
};

const NavigationLink = ({ text, onClick, isSelected, id }: NavigationLink) => {
  // console.log(id);
  // console.log(isSelected);
  const links = useMemo(() => {
    return DropDownLinks.filter((link) => link.id === id);
  }, [isSelected]);

  return (
    <div className="relative">
      <Button
        type="button"
        center
        secondary
        className="relative z-30 bg-blue-400"
        onClick={onClick}
      >
        {text}
      </Button>
      {/* {isSelected === id && (
        <div
          className={cn(
            "absolute mt-2 bg-white z-20 overflow-hidden transition-all",
            isSelected !== "" ? "animate-slideDown" : "animate-slideUp"
          )}
        >
          {links.map((link) => (
            <p>{link.text}</p>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default NavigationLink;
