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
          <ListItem text="Sign in" href="/" />
          <ListItem href="/" text="Create account" />
          <ListItem>
            <Link
              href="/"
              className="flexBetween focus-visible:outline-none px-4 py-3 h-full list-dot"
            >
              <span className="">Orders</span>
              <span className="text-[#666666]">Track + manage</span>
            </Link>
          </ListItem>
          <ListItem href="/" imageURL="/target_account_modal.svg" />
          <ListItem text="Sign in" href="/" className="h-32">
            <Link
              href="/"
              className="flex flex-col justify-center items-start focus-visible:outline-none pl-8 pr-4 py-3 h-full list-dot"
            >
              <h3 className="text-lg font-bold">
                Target Circle<span className="text-xs align-top">™</span>
              </h3>
              <p className="font-bold">Get members-only deals</p>
              <p className="text-[#666666]">
                Join free and get access to automatic deals, personalized
                bonuses & more.
              </p>
            </Link>
          </ListItem>
          <ListItem text="Sign in" href="/" className="h-36">
            <Link
              href="/"
              className="flex flex-col justify-center items-start focus-visible:outline-none pl-8 pr-4 py-3 h-full list-dot"
            >
              <h3 className="text-lg font-bold">
                Target Circle<span className="text-xs align-top">™</span> Card
              </h3>
              <p className="font-bold">
                Save 5%<sup className="text-xs pl-1">1</sup> instantly, in-store
                & online
              </p>
              <p className="text-[#666666]">
                Find the right card for you: Credit, debit, or reloadable.
              </p>
              <p className="text-xs text-[#666666] tracking-tighter">
                <sup className="text-[0.625rem]">1</sup>Restrictions apply. See&nbsp;
                <Link href="/" className="underline">Target.com/CircleCard</Link> for details.
              </p>
            </Link>
          </ListItem>
          <p>signin</p>
        </ul>
      </div>
    </>
  );
};
