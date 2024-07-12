import { TModalActions, TModalContext, TModalData, TModalState } from "@/types";
import { createContext, useContext } from "react";

const initContext: TModalContext = {
  type: "CLOSE",
  isOpen: false,
  isAnimating: false,
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
    state.isAnimating = true;
    state.type = action.type;
    console.log(state.isOpen);
    setTimeout(() => {
      state.isAnimating = false;
      state.data = action.data;
      state.isOpen = true;

      

      // return {
      //   type: action.type,
      //   isOpen: true,
      //   isAnimating: false,
      //   data: action.data,
      // };
      return state;
    }, 1000);
  }
  if (action.type === "CLOSE") {
    // state.isAnimating = true;
    // setTimeout(() => {
      return {
        type: "CLOSE",
        isOpen: false,
        isAnimating: false,
        data: action.data,
      };
    // }, 5000);
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
