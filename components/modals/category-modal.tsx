"use client";
import { useModal } from "@/hooks/use-modal-store";
import { ModalHeader } from "./modal-header";
import { NavBarLinks } from "@/lib/constants";
import Link from "next/link";
import { ModalLayout } from "./modal-layout";

type CategoryModalProps = {
  children?: React.ReactNode;
};

export const CategoryModal = ({ children }: CategoryModalProps) => {
  const { isOpen, type } = useModal();

  if (type !== "CATEGORY" || isOpen === false) {
    document.body.style.overflow = "scroll";
    return null;
  } else {
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      {children}
      <div className="mx-2 h-full">
        <div className="border-b flex items-center justify-start h-12 w-full">
          <h1 className="pb-3 text-lg font-bold">All categories</h1>
        </div>
        {NavBarLinks.at(0)?.children.map((category) => (
          <div
            className="border-b flex items-center justify-start h-10 w-full"
            key={category.text}
          >
            <Link
              className="w-full hover:underline focus:underline focus-visible:outline-none"
              href={category.href}
            >
              {category.text}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
