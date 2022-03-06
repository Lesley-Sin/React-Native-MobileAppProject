import {
    StyleSheet
} from "react-native";
import {
    colorScheme,
    fontScheme,
    radiusScheme,
    sizesScheme
} from "../../../../globalStyles/constants";

export const HTMLTextEditorStyles = StyleSheet.create({

    editor: {
        borderRadius: radiusScheme.defaultDegree,
        fontSize: fontScheme.form.size,
        height: sizesScheme.InputBtn.default.height,
        borderWidth: 1,
        paddingHorizontal: 5,
        borderColor: colorScheme.formColors.mainColor,
    },

});