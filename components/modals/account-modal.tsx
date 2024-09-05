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
      <div className="flex flex-col mx-4">
        <ul className="">
          <li className="border-b noHoverOnFocusUnderline focus-within:list-outside focus-within:list-disc">
            <Link href="/" className="focus-visible:outline-none">
              Sign in
            </Link>
          </li>
          <li className="border-b">
            <Link href="/">Create account</Link>
          </li>
          <li className="border-b">
            <Link href="/" className="flexBetween">
              <span className="">Orders</span>
              <span className="">Track + manage</span>
            </Link>
          </li>
          <p>signin</p>
          <p>signin</p>
          <p>signin</p>
          <p>signin</p>
        </ul>
      </div>
    </>
  );
};
