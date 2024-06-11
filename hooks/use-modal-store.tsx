import { ModalActions } from "@/types";
import { createContext, useContext, useReducer } from "react";

type ModalState = {
  type: ModalActions | null;
  isOpen: boolean;
};

const initState: ModalState = {
  type: "CLOSE",
  isOpen: false,
};
export const ModalContext = createContext<ModalState>(initState);

export const modalReducer = (state: ModalState, action: ModalActions) => {
  if (action !== "CLOSE") {
    return {
      type: action,
      isOpen: true,
    };
  }
  if (action === "CLOSE") {
    return {
      type: action,
      isOpen: false,
    };
  }
  return state;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initState);
  const onOpen = (type: ModalActions) => {
    dispatch(type)
  }
  const onClose = () => {
    dispatch("CLOSE")
  }
  const value = {
    isOpen: state.isOpen,
    type: state.type,
    onOpen: onOpen,
    onClose: onClose
  }
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext")
  }
  return context
}
