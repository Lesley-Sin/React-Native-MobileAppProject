import { FontAwesomeIcon, Props } from '@fortawesome/react-native-fontawesome';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { colorScheme, paddings, sizesScheme } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';
import { WeightType } from '../../globalStyles/enums/constants';
import { StyledText } from '../Typography/StyledTypography';

export const StyledFontAwasomeIcon = (props: Props) => {
    const { color } = props;
    return (
        <FontAwesomeIcon
            size={sizesScheme.Icons.default}
            color={color ? color : colorScheme.defaultColors.mainColor}
            {...props}
        />
    );
};

interface IAbreviationIcon {
    name: string;
    border?: boolean;
    color?: string;
    size?: AbreviationIconSizeType;
    borderColor?: string;
    fontSize?: number;
}

export enum AbreviationIconSizeType {
    small = 'small',
    medium = 'medium',
    big = 'big',
}

export const getSize = (size: AbreviationIconSizeType) => {
    switch (size) {
        case AbreviationIconSizeType.small:
            return sizesScheme.InputBtn.square.width;
        case AbreviationIconSizeType.medium:
            return 60;
        case AbreviationIconSizeType.big:
            return 80;
        default:
            return sizesScheme.InputBtn.square.width;
    }
};

export const AbreviationIcon: FC<IAbreviationIcon> = ({
    name,
    color,
    border = false,
    borderColor = colorScheme.defaultColors.greyoutColor,
    size = AbreviationIconSizeType.big,
    fontSize,
}) => {
    const nameArr = name.split(' ');
    const getNickName = () => {
        switch (nameArr.length) {
            case 1:
                return nameArr[0].split('')[0] + nameArr[0].split('')[1];
            case 2:
                return nameArr[0].split('')[0] + nameArr[1].split('')[0];
        }
    };

    // const initials = : return nameArr[0].split('')[0] + nameArr[0].split('')[1]

    interface IStyleParams {
        size: string | number;
        borderWidth: number;
    }

    const nickNameStyles = ({ size, borderWidth }: IStyleParams) =>
        StyleSheet.create({
            content: {
                width: size,
                height: size,
                backgroundColor: colorScheme.defaultColors.mainColor,
                borderRadius: 100,
                paddingTop: -10,

                borderColor: borderColor,
                borderWidth: borderWidth,
            },
        });

    const styleParams = {
        size: getSize(size),
        borderWidth: border ? 1 : 0,
    };

    return (
        <View style={[nickNameStyles(styleParams).content, flexBoxRow.CenterCenter]}>
            <StyledText
                fontSize={fontSize && fontSize}
                fontWeight={WeightType.Lighter}
                color={color ? color : colorScheme.defaultColors.defaultBackgroundColor}
            >
                {getNickName()}
            </StyledText>
        </View>
    );
};
