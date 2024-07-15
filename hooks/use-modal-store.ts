import { TModalActions, TModalContext, TModalData, TModalState } from "@/types";
import { createContext, useContext } from "react";

const initContext: TModalContext = {
  type: "CLOSE",
  isOpen: false,
  data: {},
  onOpen: (type, data) => {},
  onClose: () => {},
};

export const ModalContext = createContext<TModalContext>(initContext);

export const modalReducer = (
  state: TModalState,
  action: { data: TModalData; type: TModalActions }
): TModalState => {
  if (action.type !== "CLOSE") {
    return {
      type: action.type,
      isOpen: true,
      data: action.data,
    };
  }
  if (action.type === "CLOSE") {
    return {
      type: "CLOSE",
      isOpen: false,
      data: action.data,
    };
  }
  return state;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("usemodal must be used within modalContext");
  }
  return context;
};
