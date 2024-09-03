"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type AccountModalProps = {
  children?: React.ReactNode;
};

export const AccountModal = ({ children }: AccountModalProps) => {
  const { isOpen, type } = useModal();

  if (type !== "ACCOUNT" || !isOpen) {
    document.body.style.overflow = "scroll";
    return null;
  } else {
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      {children}
      <div className="flex flex-col ml-4">
        <Link href="/">Sign in</Link>
        <Link href="/">Create account</Link>
        <div className="">
          <Link href="/"></Link>
        </div>
        <p>signin</p>
        <p>signin</p>
        <p>signin</p>
        <p>signin</p>
      </div>
    </>
  );
};
