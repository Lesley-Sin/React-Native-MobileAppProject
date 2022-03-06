import { StyleSheet } from "react-native";
import { NativeSafeAreaViewProps } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { colorScheme, sizesScheme } from "../../../globalStyles/constants";

export const StyledSafeAreaView = styled.SafeAreaView<NativeSafeAreaViewProps>`
    background-color: ${colorScheme.defaultColors.defaultBackgroundColor};
    height: ${sizesScheme.workspace.height}px;
`;
