import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { faQuestion } from '@fortawesome/pro-light-svg-icons';
import { IconButton, Menu, Pressable } from 'native-base';
import { TextContainer } from '../InputFields/CheckBox/Boolean/Boolean';
import { paddings } from '../../globalStyles/constants';
import { StyledSmallText } from '../Typography/StyledTypography';
import { ThemeColor } from '../../globalStyles/colors/enums/colorTypes';

interface HelperTextProps {
    textContainer: TextContainer;
    style?: StyleProp<ViewStyle>;
}
export const HelperText: FC<HelperTextProps> = ({ textContainer, style }) => {
    const [showHelper, setShowHelper] = React.useState(false);

    if (Object.keys(textContainer).length > 0) {
        return (
            <Menu
                trigger={(triggerProps) => {
                    return (
                        <Pressable {...triggerProps}>
                            <FontAwesomeIcon icon={faQuestion} size={10} />
                        </Pressable>
                    );
                }}
            >
                <View style={{ paddingHorizontal: paddings.smallPadding }}>
                    <StyledSmallText themeColor={ThemeColor.secColor}>{textContainer.ru}</StyledSmallText>
                </View>
            </Menu>
        );
    }
    return <></>;
};
