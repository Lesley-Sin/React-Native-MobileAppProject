import React, { FC } from "react"
import { Text, View } from "react-native"
import { AccessType } from "../../Enums/AccessType"
import { HelperText } from "../../HelperText/HelperText"
import { FieldComponent } from "../../Interfaces/FieldComponent"
import { StyledFormControlLabel } from "../Form"

interface FieldComponentProps {
    props: FieldComponent
}
export const UpperFieldData: FC<FieldComponentProps> = ({ props }) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <StyledFormControlLabel>{props.label.text.ru}</StyledFormControlLabel>
            {props.accessType == AccessType.Required && <Text style={{ color: "red" }}>*</Text>}
            <HelperText
                textContainer={props.helpText}
                style={{ flexDirection: "row" }} />
        </View>
    )
}