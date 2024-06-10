import { ReducerAction, ReducerWithoutAction, useReducer } from "react";

export type ModalActions = 
    | "account"
    | "location"

type ModalState = {
    type: ModalActions | null,
    isOpen: boolean
    onOpen: (type: ModalActions) => void,
    onClose: () => void,
}


const onClose = () => {
    console.log(onClose);
    
}

const onOpen = (type: ModalActions) => {
return {
    type,
    isOpen: true,
}
}

const modalReducer = (state: ModalState, action: ModalActions) => {
    if (action) {
        onOpen(action)
    }
    if (!action) {
        onClose()
    }
    return state;
}

export const useModal = () => {
    const [state, dispatch] = useReducer(modalReducer, {
        type: null,
        isOpen: false,
        onOpen: onOpen,
        onClose: onClose,
    });
}