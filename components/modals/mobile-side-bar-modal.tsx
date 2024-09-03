"use client";
import { useModal } from "@/hooks/use-modal-store";
import { ChevronRight } from "lucide-react";
import { FinanceBarLinks, NavBarLinks } from "@/lib/constants";
import { MobileDropDownList } from "@/components/ui/dropdown/mobile-drop-down-list";
import { MobilePickupDelivery } from "@/components/ui/mobile/mobile-pickup-delivery";
import { MobileFinanceBarLink } from "@/components/ui/mobile/mobile-finance-bar-link";
import { Button } from "@/components/ui/button";

type MobileSideBarModalProps = {
  children?: React.ReactNode;
};

export const MobileSideBarModal = ({ children }: MobileSideBarModalProps) => {
  const { isOpen, type, onOpen } = useModal();

  const pickupDeliveryLinks = NavBarLinks.at(3)?.children as {
    href: string;
    imageURL: string;
    title: string;
    mobileText: string;
  }[];

  if (type !== "MOBILESIDEBAR" || !isOpen) {
    document.body.style.overflow = "scroll";
    return null;
  } else {
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      {children}
      {NavBarLinks.map((link, i) => (
        <div key={link.key} className="flex flex-col mx-4 border-b-2">
          {i === 0 ? (
            <Button
              type="button"
              secondary
              onClick={() => onOpen("CATEGORY", {})}
              className="flexBetween cursor-pointer h-14 hover:underline px-0"
            >
              <h1 className="text-xl font-bold text-slate-800">{link.text}</h1>
              <ChevronRight size={48} strokeWidth={1} />
            </Button>
          ) : (
            <h1 className="pt-3 text-xl font-bold text-slate-800">
              {link.text}
            </h1>
          )}
          {i < NavBarLinks.length - 1 ? (
            <MobileDropDownList index={i} links={link.children} />
          ) : (
            <MobilePickupDelivery links={pickupDeliveryLinks} />
          )}
        </div>
      ))}
      {FinanceBarLinks.map((link, i) => (
        <MobileFinanceBarLink link={link} key={link.key} />
      ))}
    </>
  );
};
