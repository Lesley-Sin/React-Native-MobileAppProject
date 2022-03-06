import React, { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colorScheme } from "../../globalStyles/constants";

export const WithLinearGradient: FC = ({ children }) => {
  return (
    <LinearGradient
      colors={colorScheme.defaultColors.gradientColor}
      style={{ height: "100%" }}
    >
      {children}
    </LinearGradient>
  );
};
