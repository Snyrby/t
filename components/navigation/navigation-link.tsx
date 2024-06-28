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
  dropDownRef: RefObject<HTMLButtonElement>;
};

const NavigationLink = ({
  text,
  onClick,
  isSelected,
  id,
  dropDownRef,
}: NavigationLink) => {
  // console.log(id);
  // console.log(isSelected);
  // const links = useMemo(() => {
  //   return DropDownLinks.filter((link) => link.id === id);
  // }, [isSelected]);
  console.log(dropDownRef);

  return (
    <div>
    <Button
      type="button"
      center
      secondary
      className="relative z-30 bg-blue-400"
      onClick={onClick}
      refObject={dropDownRef}
    >
      {text}
    </Button>
    {/* <div
    className={cn(
      "absolute bg-white z-[29] overflow-hidden transition-all w-20 flexCenter",
    )}
  >
    test
  </div> */}
  </div>

  );
};

export default NavigationLink;
