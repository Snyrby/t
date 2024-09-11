"use client";
import { useModal } from "@/hooks/use-modal-store";
import Link from "next/link";
import { ListItem } from "@/components/ui/list-item";

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
      <div className="flex flex-col">
        <ul className="-mt-3">
          <ListItem text="Sign in" href="/"/>
          <ListItem href="/" text="Create account"/>
          <ListItem>
            <Link href="/" className="flexBetween w-full">
              <span className="">Orders</span>
              <span className="">Track + manage</span>
            </Link>
          </ListItem>
          <ListItem href="/" imageURL="/target_account_modal.svg" />
          <p>signin</p>
          <p>signin</p>
          <p>signin</p>
        </ul>
      </div>
    </>
  );
};
