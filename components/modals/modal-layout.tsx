import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CategoryModal } from "./category-modal";
import { LocationModal } from "./location-modal";
import { MobileSideBarModal } from "./mobile-side-bar-modal";
import { ModalHeader } from "./modal-header";
import { AccountModal } from "./account-modal";

export const ModalLayout = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const { onClose, isOpen, type } = useModal();

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

  if (isOpen === false) {
    return null;
  }

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 z-50 h-full bg-white w-[25rem] shadow-lg transform transition-transform duration-300",
          type !== "ACCOUNT"
            ? isAnimating
              ? "animate-slideOut"
              : "animate-slideIn"
            : isAnimating
            ? "animate-slideOutFromRight"
            : "animate-slideInFromRight",
          type === "ACCOUNT" ? "right-0" : "left-0"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <CategoryModal>
            <ModalHeader title="Categories" onClose={onCloseClick} category />
          </CategoryModal>
          <LocationModal onCloseClick={onCloseClick} />
          <MobileSideBarModal>
            <ModalHeader title="Menu" onClose={onCloseClick} />
          </MobileSideBarModal>
          <AccountModal>
            <ModalHeader title="Account" onClose={onCloseClick} />
          </AccountModal>
        </div>
      </aside>
      <button
        className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-[49]"
        onClick={onCloseClick}
      />
    </>
  );
};
