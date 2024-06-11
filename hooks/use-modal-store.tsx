import { ModalActions } from "@/types";
import { ReducerAction, ReducerWithoutAction, createContext, useContext, useReducer } from "react";

type ModalState = {
    type: ModalActions | null;
    isOpen: boolean;
  };

  const initState: ModalState = {
    type: "close",
    isOpen: false,
  }

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



const useModal = (initState: ModalState) => {
    const [state, dispatch] = useReducer(modalReducer, initState);
      console.log(state);
}

export const modalContext = createContext<ModalState>(initState)