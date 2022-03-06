import { StyleSheet } from "react-native";
import {
  colorScheme,
  paddings,
  radiusScheme,
  sizesScheme,
} from "../../../globalStyles/constants";

export const SelectStyles = StyleSheet.create({
  content: {
    borderRadius: radiusScheme.defaultDegree,
    borderWidth: 1,
    borderColor: colorScheme.defaultColors.defaultBackgroundColor,
  },
  header: {
    paddingHorizontal: paddings.defaultPaddings,
    borderRadius: radiusScheme.defaultDegree,
    borderColor: colorScheme.formColors.mainColor,
    height: sizesScheme.InputBtn.default.height,
    borderWidth: 1,
    backgroundColor: colorScheme.defaultColors.mainColor,
  },
  backdrop: {
    top: -500,
    bottom: 0,
    left: -500,
    right: 0,
    width: 1000,
    height: 1600,
    margin: "auto",
    position: "absolute",
  },
});

export const SelectStylesItem = (active: boolean) =>
  StyleSheet.create({
    item: {
      paddingHorizontal: paddings.extraPadding,
      height: sizesScheme.InputBtn.default.height,
      backgroundColor: active
        ? colorScheme.formColors.paleSelectColor
        : colorScheme.defaultColors.mainColor,
    },
  });
