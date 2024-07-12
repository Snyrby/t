"use client";

import { ModalContext, modalReducer } from "@/hooks/use-modal-store";
import { TModalActions, TModalData, TModalState } from "@/types";
import { useReducer, useMemo } from "react";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const initState: TModalState = {
    type: "CLOSE",
    data: {},
    isOpen: false,
    isAnimating: false,
  };

  const [state, dispatch] = useReducer(modalReducer, initState);
  const onOpen = (type: TModalActions, data: TModalData) => {
    dispatch({ data, type });
  };
  const onClose = () => {
    dispatch({ data: {}, type: "CLOSE"});
  };
  const value = useMemo(() => {
    return {
      isOpen: state.isOpen,
      isAnimating: state.isAnimating,
      type: state.type,
      data: state.data,
      onOpen: onOpen,
      onClose: onClose,
    };
  }, [state.isOpen, state.type]);
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
