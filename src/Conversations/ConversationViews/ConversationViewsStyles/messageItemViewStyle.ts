import { wrap } from "lodash";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { colorScheme, margins, paddings, radiusScheme } from "../../../globalStyles/constants";

export const MessageItemViewStyle = StyleSheet.create({
    divider: {
        marginTop: 4,
        height: "auto",
    },

    messageBox: {
        maxWidth: "92%",
        zIndex: 0,
        overflow: "visible",
        marginTop: margins.deafaultMargins,
    },

    body: {},

    bodyWrapper: {
        flexDirection: "column",
    },

    user: {
        flexBasis: "100%",
    },

    date: {
        flexBasis: "90%",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: paddings.defaultPaddings,
    },

    message: {
        flexBasis: "99%",
    },

    icons: {
        flexBasis: "5%",
    },

    iconFirst: {
        color: colorScheme.conversationsColors.iconFirstColor,
        marginLeft: margins.exSmallMargin,
    },

    iconSecond: {
        flex: 1,
        color: colorScheme.conversationsColors.iconSecond,
        marginLeft: margins.exSmallMargin,
    },
});

interface IMessageBox {
    isArchived: boolean;
    backgroundColor: string;
    borderTopLeftRadius: string | number;
    borderBottomRightRadius: string | number;
}

export const PressableButton = styled.Pressable<IMessageBox>`
    border-radius: ${radiusScheme.bigRadius}px;
    border-top-left-radius: ${({ borderTopLeftRadius }) => borderTopLeftRadius}px;
    border-bottom-right-radius: ${({ borderBottomRightRadius }) => borderBottomRightRadius}px;
    padding: ${paddings.smallPadding}px;
    width: auto;
    background-color: ${({ isArchived, backgroundColor }) => (isArchived ? "#524f4f" : backgroundColor)};
`;

// style={{ backgroundColor: message.creator.color }}
