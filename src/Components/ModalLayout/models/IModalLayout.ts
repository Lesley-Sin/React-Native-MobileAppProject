import type { GestureResponderEvent } from "react-native";

export interface IModalLayout {
    isOpen: boolean;
    onClose: (() => any) | undefined;
    onCancel?: ((event?: GestureResponderEvent) => void) | null | undefined;
    onContinue: ((event?: GestureResponderEvent) => void) | null | undefined;
    mainBtnText?: string;
    bodyChildren: JSX.Element;
    footerChildren?: JSX.Element;
    title?: string;
};