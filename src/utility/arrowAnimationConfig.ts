import { Easing } from "react-native";
import { IWithToggleAnimation } from "../globalHooks/Animated/types";

export const translationArrowConfig: IWithToggleAnimation = {
    duration: 300,
    nativeDriver: true,
    easing: Easing.linear,
    outPutRange: ["0deg", "-180deg"],
  };
