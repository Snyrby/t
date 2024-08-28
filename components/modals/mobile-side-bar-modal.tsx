"use client";
import { useModal } from "@/hooks/use-modal-store";
import { X, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NavBarLinks } from "@/lib/constants";
import { MobileDropDownList } from "../ui/dropdown/mobile-drop-down-list";

type LocationFormProps = {
  zipCode: string;
};

export const MobileSideBarModal = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const { isOpen, onClose, type } = useModal();

  const onCloseClick = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      setIsAnimating(true);
    }, 250);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        onCloseClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", onCloseClick);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", onCloseClick);
  }, []); // Empty array ensures that effect is only run on mount

  if (type !== "MOBILESIDEBAR" || !isOpen) {
    return null;
  }

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-white w-[25rem] shadow-lg transform transition-transform duration-300",
          isAnimating ? "animate-slideOut" : "animate-slideIn"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flexBetween my-3 border-b h-16">
            <p className="text-2xl font-bold ml-5 text-slate-800">Menu</p>
            <div className="bg-gray-100 opacity-50 rounded-full transition hover:opacity-100 size-7 flexCenter mr-5">
              <X
                onClick={onCloseClick}
                className="cursor-pointer opacity-100"
                size={28}
                color="black"
              />
            </div>
          </div>
          {NavBarLinks.map((link, i) => (
            <div key={link.key} className="flex flex-col mx-4">
              {i === 0 ? (
                <div className="flexBetween cursor-pointer h-14">
                  <h1 className="hover:underline text-xl font-bold text-slate-800">
                    {link.text}
                  </h1>
                  <ChevronRight size={48} strokeWidth={1} />
                </div>
              ) : (
                <h1 className=" text-xl font-bold">{link.text}</h1>
              )}
              <MobileDropDownList index={i} links={link.children} />
            </div>
          ))}
        </div>
      </aside>
      <button
        className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-[49]"
        onClick={onCloseClick}
      />
    </>
  );
};
