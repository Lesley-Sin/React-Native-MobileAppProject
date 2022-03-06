import { createContext } from "react";
import { Animated } from "react-native";

 const AnimationContext = createContext({
    listAnimationInterpolation: 0,
    setInterpolation: (value: number ) => {}
});

export default AnimationContext