import { StyleSheet } from "react-native";
import { colorScheme } from "../../../globalStyles/constants";

export const mainScreenStyle = StyleSheet.create({
    badge: {
        borderRadius: 15, 
        backgroundColor: "red", 

    },
    


    button: {
        height: 40, 
        width: 120,
        backgroundColor: colorScheme.defaultColors.defaultBackgroundColor,
    }
});