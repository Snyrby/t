"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useRef } from "react";

type DropDownListProps = {
  text: string;
};

const DropDownList = ({ text }: DropDownListProps) => {
  const refs = useRef<React.RefObject<HTMLButtonElement>[]>([]);
  const { isOpen, onClose, type, data } = useModal();
  const { refPosition } = data;

  return (
    <Button type="button" center fullWidth secondary className="border-b">
      {text}
    </Button>
  );
};

export default DropDownList;
