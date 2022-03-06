import { faExclamationCircle, faExclamationTriangle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Menu } from "native-base";
import React, { FC, ReactElement, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ThemeColor } from "../../globalStyles/colors/enums/colorTypes";
import { paddings } from "../../globalStyles/constants";
import { WidgetMessage } from "../Interfaces/DataformWidgetsQuery";
import { StyledSmallText } from "../Typography/StyledTypography";

interface FormErrorMessageProps {
    props: WidgetMessage[] | undefined

}

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ props }) => {
    return (
    <View
        key={Math.random()}
    >
        {props?.map((item) => {
            return (<Menu
                key={Math.random()}
                trigger={(triggerProps) => {
                    return (
                        <Pressable {...triggerProps}  >
                            <FontAwesomeIcon icon={faExclamationCircle} size={20} color="red" />
                        </Pressable>
                    );
                }}
            >
                <View style={{ paddingHorizontal: paddings.smallPadding }}>
                    <FontAwesomeIcon icon={faExclamationTriangle} size={20} color="red" />
                    <StyledSmallText themeColor={ThemeColor.secColor} >{item.text}</StyledSmallText>
                </View>
            </Menu>)
        })}
    </View>)
}



