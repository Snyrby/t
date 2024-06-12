import { TModalActions, TModalContext, TModalState } from "@/types";
import { createContext, useContext } from "react";

const initContext: TModalContext = {
  type: "CLOSE",
  isOpen: false,
  onOpen: (type) => {},
  onClose: () => {},
}

export const ModalContext = createContext<TModalContext>(initContext);

export const modalReducer = (state: TModalState, action: TModalActions) => {
  if (action !== "CLOSE") {
    console.log("opened");
    return {
      type: action,
      isOpen: true,
    };
  }
  if (action === "CLOSE") {
    console.log("closed");
    return {
      type: action,
      isOpen: false,
    };
  }
  return state;
};

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext")
  }
  return context
}
