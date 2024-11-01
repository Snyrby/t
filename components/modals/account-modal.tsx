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
          <ListItem text="Sign in" href="/login?actions=create_session_signin" />
          <ListItem href="/login?actions=create_session_create_account" text="Create account" />
          <ListItem href="/" between>
            <span className="">Orders</span>
            <span className="text-[#666666]">Track + manage</span>
          </ListItem>
          <ListItem href="/" imageURL="/target_account_modal.svg" />
          <ListItem href="/" className="h-32" bigLink>
            <h3 className="text-lg font-bold">
              Target Circle<span className="text-xs align-top">™</span>
            </h3>
            <p className="font-bold">Get members-only deals</p>
            <p className="text-[#666666]">
              Join free and get access to automatic deals, personalized bonuses
              & more.
            </p>
          </ListItem>
          <ListItem href="/" bigLink className="h-36">
            <h3 className="text-lg font-bold">
              Target Circle<span className="text-xs align-top">™</span> Card
            </h3>
            <p className="font-bold">
              Save 5%<sup className="text-xs pl-1">1</sup> instantly, in-store &
              online
            </p>
            <p className="text-[#666666]">
              Find the right card for you: Credit, debit, or reloadable.
            </p>
            <p className="text-xs text-[#666666] tracking-tighter">
              <sup className="text-[0.625rem]">1</sup>Restrictions apply.
              See&nbsp;
              <Link href="/" className="underline dotted-outline-on-focus">
                Target.com/CircleCard
              </Link>{" "}
              for details.
            </p>
          </ListItem>
          <ListItem href="/" bigLink className="h-36">
            <h3 className="text-lg font-bold">
              Target Circle 360<span className="text-xs align-top">™</span>
            </h3>
            <p className="font-bold">
              Get free, fast shipping & unlimited Same-Day Delivery
            </p>
            <p className="text-[#666666]">
              Start a 14-day free trial or subscribe today.
            </p>
          </ListItem>
          <ListItem href="/" between>
            <span className="">Gift cards</span>
            <span className="text-[#666666]">Check balances</span>
          </ListItem>
          <ListItem href="/" between noUnderline>
            <span className="">Registry</span>
            <span className="text-[#666666]">Create a registry</span>
          </ListItem>
        </ul>
      </div>
    </>
  );
};
