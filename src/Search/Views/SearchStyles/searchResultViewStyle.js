import {
    StyleSheet
} from "react-native";
import {
    colorScheme
} from "../../../globalStyles/constants";

export const SearchResultViewStyles = StyleSheet.create({
    text: {
        backgroundColor: `${colorScheme.defaultColors.defaultBackgroundColor}10`,
        color: colorScheme.defaultColors.defaultBackgroundColor
    },

    boxView: {
        padding: 5,
        marginTop: 5,
        flexDirection: 'column',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4
    },

    boxText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});