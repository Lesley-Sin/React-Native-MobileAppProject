import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colorScheme } from '../../globalStyles/constants';
import { StyledText } from '../Typography/StyledTypography';

interface IBadge {
    amount: string | number | undefined;
    top?: string | number;
    right?: string | number;
    left?: string | number;
    backgroundColor?: string;
    color?: string;
    customStyles?: ViewStyle;
    fontSize?: number;
}

export const NotificationIndicator: FC<IBadge> = ({ amount, top, right, left, backgroundColor, customStyles, color, fontSize }) => {
    const badgeStyles = StyleSheet.create({
        default: {
            borderColor: colorScheme.defaultColors.mainColor,
            borderRadius: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 17,
            minWidth: 17,
            maxWidth: 40,
            zIndex: 10,

            backgroundColor: backgroundColor ? backgroundColor : colorScheme.notificationColors.error,
        },
        position: {
            position: 'absolute',
            top: top ? top : -5,
            // left: left ? left : 0,
            right: right ? right : 0,
        },
    });
    return (
        <View style={[badgeStyles.default, customStyles ? customStyles : badgeStyles.position]}>
            <View style={{ marginHorizontal: 3 }}>
                <StyledText color={color ? color : colorScheme.defaultColors.mainColor} fontSize={fontSize ? fontSize : 9}>
                    {amount}
                </StyledText>
            </View>
        </View>
    );
};
