"use client";

import { Button } from "@/components/ui/button";

type NavigationLink = {
  text: string;
  onClick: () => void;
};

export const NavigationLink = ({ text, onClick }: NavigationLink) => {
  return (
    <Button
      type="button"
      center
      secondary
      className="bg-blue-400 z-[5]"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
