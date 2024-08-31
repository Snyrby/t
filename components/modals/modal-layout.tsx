import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type ModalLayoutProps = {
  children?: React.ReactNode;
};

export const ModalLayout = ({ children }: ModalLayoutProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const { onClose } = useModal();

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

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-white w-[25rem] shadow-lg transform transition-transform duration-300",
          isAnimating ? "animate-slideOut" : "animate-slideIn"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">{children}</div>
      </aside>
      <button
        className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-[49]"
        onClick={onCloseClick}
      />
    </>
  );
};
