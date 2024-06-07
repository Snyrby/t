import { ReducerAction, ReducerWithoutAction, useReducer } from "react";

export type ModalType = 
    | "account"
    | "location"

type ModalActions = {
    type: ModalType | null,
    isOpen: boolean
    onOpen: (type: ModalType) => void,
    onClose: () => void,
}


const onClose = () => {
    console.log(onClose);
    
}

const onOpen = (type: ModalType) => {
return {
    type,
    isOpen: true,
}
}

const modalReducer = (state: ModalActions, action: any) => {
    if (action.type) {
        onOpen(action.type)
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