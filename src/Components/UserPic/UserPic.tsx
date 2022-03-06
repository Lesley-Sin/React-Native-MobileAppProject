import React, { FC, ReactChild } from 'react';
import { View } from 'react-native';
import { WithTopDefMg } from '../../globalStyles';
import { colorScheme, fontScheme } from '../../globalStyles/constants';
import { flexBoxColumn, flexBoxRow } from '../../globalStyles/flexBox';
import { AbreviationIcon, AbreviationIconSizeType } from '../Icons/Icons';
import { StyledMainTitle, StyledSecodaryTitle, StyledText } from '../Typography/StyledTypography';

interface IUserPic {
    mail?: string;
    abreviation: string;
    borderColor?: string;
    border?: boolean;
    abreviationColor?: string;
    abreviationFontSize?: number;
    nameFontSize?: number;
    abreviationIconSize?: AbreviationIconSizeType;
    direction?: IUserPicDirection;
}

export enum IUserPicDirection {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export const UserPicMain: FC<IUserPic> = ({ mail, border = true, borderColor = colorScheme.defaultColors.greyoutColor, direction = IUserPicDirection.vertical, abreviationIconSize = AbreviationIconSizeType.big, abreviation, abreviationColor = colorScheme.defaultColors.greyoutColor, abreviationFontSize = 40, nameFontSize = fontScheme.h3.size, children }) => {
    interface IUserPickChildren {
        name: React.ReactNode;
        mail: React.ReactNode;
    }

    const userPickChildren: IUserPickChildren = {} as IUserPickChildren;

    let userPickDirection;
    if (direction === IUserPicDirection.vertical) {
        userPickDirection = flexBoxColumn.CenterCenter;
    }
    if (direction === IUserPicDirection.horizontal) {
        userPickDirection = flexBoxRow.CenterCenter;
    }

    React.Children.map(children, (arg) => {
        let childrentype = arg?.type.toString().split(' ')[1].split('(')[0].toLowerCase();

        if (childrentype.length) {
            const key: keyof IUserPickChildren = childrentype;

            userPickChildren[key] = arg;
        }
    });

    return (
        <View style={userPickDirection}>
            <AbreviationIcon border={border} borderColor={borderColor} color={abreviationColor} name={abreviation} fontSize={abreviationFontSize} size={abreviationIconSize} />
            <WithTopDefMg>
                <View style={flexBoxColumn.CenterCenter}>{children}</View>
            </WithTopDefMg>
        </View>
    );
};

interface IUserPickText {
    color?: string;
    fontSize?: number;
}

const Name: FC<IUserPickText> = ({ children, color = colorScheme.defaultColors.mainColor, fontSize }, props) => {
    return (
        <StyledSecodaryTitle fontSize={fontSize && fontSize} {...props} color={color}>
            {children}
        </StyledSecodaryTitle>
    );
};
const Mail: FC<IUserPickText> = ({ children, color = colorScheme.formColors.mainColor, fontSize }) => {
    return (
        <StyledText fontSize={fontSize && fontSize} color={color}>
            {children}
        </StyledText>
    );
};

export const UserPic = Object.assign(UserPicMain, { Name, Mail });
