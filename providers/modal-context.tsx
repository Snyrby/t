"use client";

import { ModalContext, modalReducer } from "@/hooks/use-modal-store";
import { TModalActions, TModalState } from "@/types";
import { useReducer, useMemo } from "react";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const initState: TModalState = {
    type: "CLOSE",
    isOpen: false,
  };

  const [state, dispatch] = useReducer(modalReducer, initState);
  const onOpen = (type: TModalActions) => {
    dispatch(type);
  };
  const onClose = () => {
    dispatch("CLOSE");
  };
  const memo = useMemo(() => {
    const value = {
      isOpen: state.isOpen,
      type: state.type,
      onOpen: onOpen,
      onClose: onClose,
    };
    return value;
  }, [state.isOpen, state.type]);
  return <ModalContext.Provider value={memo}>{children}</ModalContext.Provider>;
};
