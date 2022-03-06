import { StyleSheet } from "react-native";
import { fontScheme, margins } from "../../../globalStyles/constants";

export const DrawerItemStyle = StyleSheet.create({
    boxField: {
        marginTop: margins.deafaultMargins,
    },


    searcherInput: {
        flex: 1,

    },

    inputField: {
        fontSize: fontScheme.text.size,
        fontWeight: fontScheme.text.weight,
        // paddingRight: 5
    },

    // listIcon: {

    // }
})

