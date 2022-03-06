interface BaseConfig {
  easing: ((value: number) => number) | undefined;
  outPutRange: [string | number, string | number];
  duration?: number;
  delay?: number;
}

export interface IWithLoopAnimation extends BaseConfig {}

export interface IWithToggleAnimation extends BaseConfig {
  nativeDriver: boolean;
}

export interface IWithToggleHeightAnimation extends BaseConfig {
  nativeDriver: boolean;
  startValue: string | number;
  middleValue: string | number;
  endValue: string | number;
}
