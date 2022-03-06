import { faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, IButtonProps, Pressable } from 'native-base';
import React, { FC, useState } from 'react';
import { Insets, StyleSheet, ViewStyle } from 'react-native';
import { commonStyles } from '../../globalStyles/colors/colors';
import { ThemeColor } from '../../globalStyles/colors/enums/colorTypes';
import { colorScheme, fontScheme, paddings, radiusScheme, sizesScheme } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';

interface IButton extends IButtonProps {
    customStyles?: ViewStyle;
    themeColor?: ThemeColor;
    color?: string;
    backgroundThemeColor?: ThemeColor;
    backgroundColor?: string;
}

interface ISquareButton extends IButton {
    icon: JSX.Element;
}

interface ICustomButtonStyles {
    width?: number | string;
}

const button = {
    common: StyleSheet.create({
        styles: {
            fontFamily: 'Open Sans Bold',
            paddingTop: 0,
            paddingBottom: 0,
        },
    }),
    default: (height?: number | string) =>
        StyleSheet.create({
            styles: {
                borderRadius: radiusScheme.defaultDegree,
                paddingLeft: paddings.defaultPaddings,
                paddingRight: paddings.defaultPaddings,
                alignSelf: 'flex-start',
                // display: '',
                height: height ? height : sizesScheme.InputBtn.default.height,
            },
        }),
    stretched: (height?: number | string) =>
        StyleSheet.create({
            styles: {
                borderRadius: radiusScheme.bigRadius,
                height: height ? height : sizesScheme.InputBtn.stretch.height,
            },
        }),
    square: {
        borderRadius: radiusScheme.defaultDegree,
        width: sizesScheme.InputBtn.square.width,
        height: sizesScheme.InputBtn.square.height,
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancel: {
        borderRadius: radiusScheme.defaultDegree,
        backgroundColor: colorScheme.buttonColors.cancelBackground,
        color: colorScheme.defaultColors.secColor,
    },
    disabled: {
        backgroundColor: colorScheme.buttonColors.defaultUnactiveBackground,
        // opacity: 0.5,
    },
    disabledCancel: {
        opacity: 0.5,
    },
};

const swipableButtonStyles = (color: string, bgColor: string) =>
    StyleSheet.create({
        btn: {
            height: '100%',
            color: color ? color : colorScheme.defaultColors.mainColor,
            backgroundColor: bgColor,
            borderRadius: 0,
            // alignSelf: "flex-start",
            // padding: 0,
            paddingLeft: paddings.smallPadding,
            paddingRight: paddings.smallPadding,
        },
    });

const buttonStyleParams = (width: number | string) => {
    return {
        width: width,
    };
};

export const StretchedButton = (props: IButton): JSX.Element => {
    // const customStyle = customStyles ? customStyles : "";
    const { children, disabled, backgroundThemeColor, backgroundColor, height, color, themeColor, customStyles } = props;

    const btnHeight = height as string | number;
    const disabledStyles = disabled ? button.disabled : '';

    return (
        <Button
            _text={{ ...commonStyles.color(themeColor, color).common, fontSize: fontScheme.btn.size }}
            style={{
                ...commonStyles.backgroundColor(backgroundThemeColor, backgroundColor).common,
                ...button.stretched(btnHeight).styles,
                ...button.common.styles,
                ...customStyles,
                ...disabledStyles,
            }}
            // px={0}

            {...props}
        >
            {children}
        </Button>
    );
};

export const DefaultButton = (props: IButton): JSX.Element => {
    const { children, disabled, customStyles, backgroundThemeColor, backgroundColor, height } = props;
    const btnHeight = height as string | number;
    const customStyle = customStyles ? customStyles : '';
    const disabledStyles = disabled ? button.disabled : '';

    return (
        <Button
            _text={{ fontSize: fontScheme.btn.size }}
            style={{
                ...button.common.styles,
                ...commonStyles.backgroundColor(backgroundThemeColor, backgroundColor).common,
                ...button.default(btnHeight).styles,
                ...customStyle,
                ...disabledStyles,
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export const AddButton = (props: IButton): JSX.Element => {
    const { children, disabled, customStyles } = props;
    const customStyle = customStyles ? customStyles : '';
    const disabledStyles = disabled ? button.disabled : '';

    return (
        <Button
            startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
            _text={{ fontSize: fontScheme.btn.size }}
            style={{
                ...button.common,
                ...button.default,
                ...customStyle,
                ...disabledStyles,
            }}
            {...props}
        >
            {children}
        </Button>
    );
};
export const CancelButton = (props: IButton): JSX.Element => {
    const { children, disabled, customStyles } = props;
    const customStyle = customStyles ? customStyles : '';
    const disabledStyles = disabled ? button.disabledCancel : '';

    return (
        <Button
            _text={{
                fontSize: fontScheme.btn.size,
                color: colorScheme.defaultColors.secColor,
            }}
            style={{
                ...button.common.styles,
                ...button.default,
                ...button.cancel,
                ...customStyle,
                ...disabledStyles,
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export const SquareButton = (props: ISquareButton): JSX.Element => {
    const { children, disabled, icon, customStyles } = props;
    const customStyle = customStyles ? customStyles : '';
    const disabledStyles = disabled ? button.disabledCancel : '';

    return (
        <Pressable
            style={{
                ...button.common,
                ...button.square,
                ...customStyle,
                ...disabledStyles,
            }}
            {...props}
        >
            {icon}
        </Pressable>
    );
};

export const SwipableButton = (props: IButton): JSX.Element => {
    const { children, disabled, backgroundColor, customStyles } = props;
    const customStyle = customStyles ? customStyles : '';
    const disabledStyles = disabled ? button.disabled : '';
    const bgColor = backgroundColor as string;

    return (
        <Button _text={{ fontSize: fontScheme.smallText.size }} style={swipableButtonStyles(colorScheme.defaultColors.mainColor, bgColor).btn} {...props}>
            {children}
        </Button>
    );
};

// export const

interface IStyledIconButton {
    icon: JSX.Element;
    notificationIcon?: JSX.Element;
    pressed(): void;
    hitSlop?: number | Insets | null | undefined;
}

export const StyledIconButton: FC<IStyledIconButton> = ({ icon, notificationIcon, pressed, hitSlop }) => {
    const [iconBackground, setIconBackground] = useState('transparent');
    const setStyles = (style: string) => {
        setIconBackground(style);
    };

    return (
        <Pressable
            hitSlop={hitSlop && hitSlop}
            style={[{ backgroundColor: iconBackground, borderRadius: radiusScheme.defaultDegree, padding: 10 }, flexBoxRow.CenterCenter]}
            onPressIn={(e) => {
                setStyles(colorScheme.defaultColors.mainHalfOpacity);
            }}
            onPressOut={(e) => {
                setStyles('transparent');
            }}
            onPress={pressed}
        >
            {notificationIcon}
            {icon}
        </Pressable>
    );
};
