"use client";
import { FinanceBarLinks } from "@/constants";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

export const FinanceBar = () => {
  const router = useRouter();
  const { onOpen, onClose } = useModal();
  return (
    <div className="h-[50px] target-red w-full">
      <div className="flex justify-between items-center mx-auto my-0 h-full max-w-[1400px]">
        <div className="h-full flex items-center justify-start gap-x-4">
          <div className="hover:cursor-pointer">
            <button type="button" onClick={() => onOpen("LOCATION")}>
              Location
            </button>
          </div>
          <div className="hover:cursor-pointer" onClick={() => onClose()}>Store</div>
        </div>
        <div className="flex justify-end items-center text-sm text-white gap-x-5">
          {FinanceBarLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              className="hover:underline hover:cursor-pointer"
              onClick={() => router.push("/test")}
            >
              {link.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
