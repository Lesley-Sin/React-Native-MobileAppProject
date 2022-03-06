import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import {
  IWithLoopAnimation,
  IWithToggleAnimation,
  IWithToggleHeightAnimation,
} from "./types";
import { getInterpolation } from "./utility";

export const interractAnimation = (
  config: IWithToggleAnimation
): [Animated.AnimatedInterpolation, number, () => void] => {
  const { duration, easing, delay, nativeDriver, outPutRange } = config;
  const [inputRange, setInputRange] = useState(0);
  const { current } = useRef(new Animated.Value(inputRange));

  Animated.timing(current, {
    toValue: inputRange,
    duration: duration,
    delay: delay,
    easing: easing,
    useNativeDriver: nativeDriver,
  }).start();

  const interpolation = getInterpolation(current, outPutRange);

  return [
    interpolation,
    inputRange,
    () => setInputRange(inputRange === 0 ? 1 : 0),
  ];
};

export const heightAnimation = (
  config: IWithToggleHeightAnimation
): [Animated.AnimatedInterpolation, () => void] => {
  const {
    duration,
    easing,
    delay,
    nativeDriver,
    outPutRange,
    startValue,
    middleValue,
    endValue,
  } = config;
  const [inputRange, setInputRange] = useState(0);
  const { current } = useRef(new Animated.Value(inputRange));

  Animated.sequence([
    Animated.timing(current, {
      toValue: startValue,
      duration: duration,
      delay: delay,
      easing: easing,
      useNativeDriver: nativeDriver,
    }),
    Animated.timing(current, {
      toValue: middleValue,
      duration: duration,
      delay: delay,
      easing: easing,
      useNativeDriver: nativeDriver,
    }),
    Animated.timing(current, {
      toValue: endValue,
      duration: duration,
      delay: delay,
      easing: easing,
      useNativeDriver: nativeDriver,
    }),
  ]).start();

  const interpolation = getInterpolation(current, outPutRange);

  return [current, () => setInputRange(inputRange === 0 ? 1 : 0)];
};

export const loopAnimationBackFourth = (config: IWithLoopAnimation) => {
  const { duration, easing, delay, outPutRange } = config;
  const { current } = useRef(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(current, {
          toValue: 1,
          duration: duration,
          delay: delay,
          // isInteraction: true,
          easing: easing,
          useNativeDriver: false,
        }),
        Animated.timing(current, {
          toValue: 0,
          duration: duration,
          delay: delay,
          // isInteraction: true,
          easing: easing,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const interpolation = getInterpolation(current, outPutRange);

  return interpolation;
};

export const loopAnimationFourth = (
  config: IWithLoopAnimation
): [Animated.AnimatedInterpolation, () => void, () => void] => {
  const { duration, easing, delay, outPutRange } = config;
  const { current } = useRef(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(current, {
        toValue: 1,
        duration: duration,
        delay: delay,
        // isInteraction: true,
        easing: easing,
        useNativeDriver: false,
      })
    ).start();
  };

  const interpolation = getInterpolation(current, outPutRange);

  return [interpolation, () => current.stopAnimation(), () => startAnimation()];
};
