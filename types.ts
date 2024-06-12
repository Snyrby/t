export type TModalActions = "ACCOUNT" | "LOCATION" | "CLOSE";

export type TModalState = {
    type: TModalActions | null;
    isOpen: boolean;
  };

export type TModalContext = TModalState & {
    onOpen: (type: TModalActions) => void;
    onClose: () => void;
}