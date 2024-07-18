"use client";

import { Button } from "@/components/ui/button";
import { DropDownLinks } from "@/constants";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export const DropDownModal = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const { isOpen, onClose, type, data } = useModal();
  const { refPosition } = data;
  const links = useMemo(() => {
    return DropDownLinks.filter(
      (link) => link.id === refPosition?.current?.innerHTML
    );
  }, [refPosition]);
  if (type !== "DROPDOWN" || isOpen === false) {
    return null;
  }

  console.log(refPosition);
  console.log(data);

  return (
    <div
      className={cn(
        "absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-full md:w-auto z-10"
        // isSelected !== "" && !isClosing && "animate-slideDown",
        // isClosing && "animate-slideUp"
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
  );
};
