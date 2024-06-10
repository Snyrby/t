"use client";
import { FinanceBarLinks } from "@/constants";
import { ModalActions } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useReducer } from "react";

export const FinanceBar = () => {
  const router = useRouter();

  type ModalState = {
    type: ModalActions | null;
    isOpen: boolean;
  };

  const modalReducer = (state: ModalState, action: ModalActions) => {
    if (action !== "close") {
    return {
      type: action,
      isOpen: true,
    };
    }
    if (action === "close") {
      return {
        type: action,
        isOpen: false,
      };
    }
    return state;
  };

  const [state, dispatch] = useReducer(modalReducer, {
    type: null,
    isOpen: false,
  });
  console.log(state);
  
  return (
    <div className="h-[50px] target-red w-full">
      <div className="flex justify-between items-center mx-auto my-0 h-full max-w-[1400px]">
        <div className="h-full flex items-center justify-start gap-x-4">
          <div className="hover:cursor-pointer">
            <button type="button" onClick={() => dispatch("location")}>
              Location
            </button>
          </div>
          <div className="hover:cursor-pointer" onClick={() => dispatch("close")}>Store</div>
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
