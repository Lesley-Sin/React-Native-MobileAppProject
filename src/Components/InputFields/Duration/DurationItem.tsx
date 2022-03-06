import { faEye } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Input, Text } from "native-base";
import React, { FC, useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { alignItems } from "styled-system";
import { StyledFormInput } from "../../Form/Form";
import { DurationValues } from "./DurationView";

interface DurationItemProps {
  editable:boolean;
  onChange(text: string): void;
  onBlur(): void;
  value: string | undefined;
  rightValue?: string;
  onFocus(): void;
}

export const DurationItem: FC<DurationItemProps> = ({ rightValue, onChange, onBlur, value, onFocus, editable }) => {
 
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <StyledFormInput
        style={{ borderWidth: 1 }}
        maxLength={4}
        keyboardType={"number-pad"}
        onChangeText={(t) => {
          onChange(t);
        }}
        onBlur={onBlur}
        onFocus={() => onFocus()}
        value={value}
        editable={editable}
      />
      <Text>{rightValue}</Text>
    </View>
  );
};
