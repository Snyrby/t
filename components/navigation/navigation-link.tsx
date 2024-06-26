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
    <Button
      type="button"
      center
      secondary
      className="relative"
      onClick={onClick}
    >
      {text}
      {isSelected === id && (
        <div
          className={cn(
            "absolute top-8 bg-white",
            isSelected ? "animate-slideDown" : "animate-slideUp"
          )}
        >
          {links.map((link) => (
            <p>{link.text}</p>
          ))}
        </div>
      )}
    </Button>
  );
};

export default NavigationLink;
