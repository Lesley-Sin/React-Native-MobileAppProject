import { Animated } from "react-native";

export const getInterpolation = (
  animation: Animated.Value,
  outPutRange: [string | number, string | number]
) => {
  return animation.interpolate({
    inputRange: [0, 1],
    outputRange: outPutRange,
  });
};
