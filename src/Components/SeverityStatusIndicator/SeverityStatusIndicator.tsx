import { View } from "native-base";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { borderRadius } from "styled-system";
import {
  colorScheme,
  paddings,
  radiusScheme,
} from "../../globalStyles/constants";
import { StyledSmallText } from "../Typography/StyledTypography";

interface ISeverityStatusIndicator {
  type: SeverityStatusIndicatorType;
}

export enum SeverityStatusIndicatorType {
  critical = "critical",
  wish = "wish",
  usuall = "usuall",
}
export const SeverityStatusIndicator: FC<ISeverityStatusIndicator> = ({
  type,
}) => {
  const StatusTaskStyles = StyleSheet.create({
    content: {
      alignSelf: "flex-start",
      borderRadius: radiusScheme.defaultDegree,
      paddingHorizontal: paddings.smallPadding,
    },
  });

  const renderSeverityStatus = () => {
    switch (type) {
      case SeverityStatusIndicatorType.critical:
        return (
          <View
            style={[
              { backgroundColor: colorScheme.statusTaskColors.critical },
              StatusTaskStyles.content,
            ]}
          >
            <StyledSmallText>Критический</StyledSmallText>
          </View>
        );
      case SeverityStatusIndicatorType.wish:
        return (
          <View
            style={[
              { backgroundColor: colorScheme.statusTaskColors.wish },
              StatusTaskStyles.content,
            ]}
          >
            <StyledSmallText>Пожелание</StyledSmallText>
          </View>
        );
      case SeverityStatusIndicatorType.usuall:
        return (
          <View
            style={[
              { backgroundColor: colorScheme.statusTaskColors.usuall },
              StatusTaskStyles.content,
            ]}
          >
            <StyledSmallText>Обычный</StyledSmallText>
          </View>
        );
    }
  };
  return <>{renderSeverityStatus()}</>;
};
