import { FormControl, IFormControlLabelProps, IInputProps, View, TextArea, Input } from 'native-base';
import React, { FC, MutableRefObject, useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, TextInput, TextInputBase, TextInputProps, useWindowDimensions } from 'react-native';
import { Alignment } from '../Enums/Alignment';
import { colorScheme, fontScheme, margins, paddings, radiusScheme, sizesScheme } from '../../globalStyles/constants';

import { ITextAreaProps } from 'native-base/lib/typescript/components/primitives/TextArea';
import { IStyledText } from '../Typography/interfaces';

interface IStyledInputProps extends IInputProps {
    ref?: MutableRefObject<null>;
}
export interface IStyledTextAreaProps extends TextInputProps {
    ref?: MutableRefObject<null>;
    maxTextAreaHeight?: number | string;
}

export const InputStyles = StyleSheet.create({
    common: {
        width: '100%',
        paddingLeft: paddings.defaultPaddings,
        color: colorScheme.defaultColors.secColor,
        backgroundColor: colorScheme.defaultColors.mainColor,
    },
});

export const StyledFormInput = (props: IStyledInputProps) => {
    const input = StyleSheet.create({
        style: {
            borderRadius: radiusScheme.defaultDegree,
            fontSize: fontScheme.form.size,
            height: sizesScheme.InputBtn.default.height,
        },
    });

    return (
        <Input
            _focus={{
                fontSize: fontScheme.form.size,
                height: 35,
            }}
            InputRightElement={<></>}
            p={0}
            style={[input.style, InputStyles.common]}
            {...props}
        />
    );
};

interface IStyledLabel extends IStyledText {
    alignment?: Alignment;
}

interface IStyledLabel extends IFormControlLabelProps {}

export const StyledFormControlLabel: FC<IStyledLabel> = ({ fontSize, fontWeight, color, alignment, children }, props) => {
    const getAlignment = () => {
        switch (alignment) {
            case Alignment.Center:
                return 'center';
            case Alignment.Right:
                return 'right';
            default:
                return 'left';
        }
    };

    const label = StyleSheet.create({
        style: {
            fontWeight: fontScheme.h2.weight,
            color: color ? color : colorScheme.defaultColors.secColor,
            paddingLeft: paddings.defaultPaddings,
            marginBottom: margins.exSmallMargin,
            textAlign: getAlignment(),
            // '@media (max-width: 800px)': {
            //     color: 'blue',
            // },
        },
    });

    return (
        <FormControl.Label _text={{ fontSize: fontSize ? fontSize : fontScheme.form.size }} style={label.style} {...props}>
            {children}
        </FormControl.Label>
    );
};

export const StyledTextArea = (props: IStyledTextAreaProps) => {
    const { maxTextAreaHeight } = props;

    const input = StyleSheet.create({
        style: {
            paddingVertical: 2,
            paddingBottom: Platform.OS === 'ios' ? 5 : 2,
            borderColor: colorScheme.formColors.mainColor,
            borderWidth: 1,
            fontSize: fontScheme.form.size,
            borderRadius: radiusScheme.defaultDegree,
            maxHeight: maxTextAreaHeight ? maxTextAreaHeight : 'auto',
        },
    });
    return <TextInput style={[InputStyles.common, input.style]} multiline placeholder={'Введите текст'} {...props} />;
};
