import { RefObject } from "react";

export type TModalActions = "ACCOUNT" | "LOCATION" | "CLOSE" | "DROPDOWN";

export type TModalData = {
  zipCode?: string;
  refPosition?: RefObject<HTMLButtonElement>;
}

export type TModalState = {
    type: TModalActions | null;
    data: TModalData;
    isOpen: boolean;
  };

export type TModalContext = TModalState & {
    onOpen: (type: TModalActions, data: TModalData) => void;
    onClose: () => void;
}