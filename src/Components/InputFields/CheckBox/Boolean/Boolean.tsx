import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventEmitter from 'events';
import { Checkbox, Icon, Radio } from 'native-base';
import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { WithTopBigMg, WithTopDefMg, WithTopSmallMg } from '../../../../globalStyles';
import { ThemeColor } from '../../../../globalStyles/colors/enums/colorTypes';
import { colorScheme, paddings } from '../../../../globalStyles/constants';
import { flexBoxRow } from '../../../../globalStyles/flexBox';
import { AccessType } from '../../../Enums/AccessType';
import { HelperText } from '../../../HelperText/HelperText';
import { WidgetData, WidgetMessage } from '../../../Interfaces/DataformWidgetsQuery';
import { StyledText } from '../../../Typography/StyledTypography';
import { booleanErrors, updateBoolean } from './Events';

interface IBooleanProps {
    props: IBoolean | undefined;
    literal: boolean;
    onChange: (isSelected: boolean) => void;
    emitter: EventEmitter;
    id: string;
}
export type EditorType = 'Checkbox' | 'Radio';

export interface IBoolean {
    accessType: AccessType;
    fieldType: 'Boolean';
    helpText: TextContainer;
    label: Label;
    editorType: EditorType;
    trueText: TextContainer;
    falseText: TextContainer;
    id: string;
}

export type TextContainer = {
    de: string;
    en: string;
    ru: string;
};

export type Label = {
    //alignment: Alignment;
    hidden: boolean;
    text: TextContainer;
};

//TODO Localize it

export const Boolean: FC<IBooleanProps> = ({ props, literal, emitter, id, onChange }) => {
    if (!props || props.accessType == AccessType.Hidden || props.fieldType != 'Boolean') {
        return null;
    }

    const [errorMessages, setErrorMessages] = useState<JSX.Element | undefined>()
    const [value, setValue] = useState(literal);
    const [access, setAccess] = useState<AccessType>(props.accessType);

    React.useEffect(() => {
        emitter.addListener(`${booleanErrors}${id}`, setErrorMessages)
        emitter.addListener(`${updateBoolean}${id}`, (v: WidgetData) => update(v));

        return () => {
            emitter.removeAllListeners(`${updateBoolean}${id}`);
        };
    }, []);

    function update(widgetData: WidgetData) {
        if (widgetData) {
            if (widgetData.values) {
                setValue(widgetData.values.literal as boolean);
            } else {
                setValue(false)
            };
            if (widgetData.access) {
                setAccess(widgetData.access)
            };
        };
    };

    const onValueChange = () => {
        setValue(!value)
        onChange(!value)
    };

    const checkboxView = React.useMemo(() => {
        return (
            <Checkbox
                accessibilityLabel={props.label.text.ru}
                value={props.label.text.ru}
                isDisabled={access === AccessType.Readonly}
                onChange={onValueChange}
                icon={<Icon as={MaterialCommunityIcons} name="check" opacity={1} />}
                isChecked={value}
            >
                <View style={{ paddingLeft: paddings.smallPadding }}>
                    <StyledText color={colorScheme.defaultColors.secColor}>{props.label.text.ru} </StyledText>
                </View>
            </Checkbox>
        )
    }, [value])

    const CustomIcon = () => {
        const RadioIcon = styled.View`
            width: 12px;
            height: 12px;
            border-radius: 100px;
            background-color: ${colorScheme.defaultColors.defaultBackgroundColor};
        `;
        return <RadioIcon></RadioIcon>;
    };

    if (props.editorType == 'Checkbox') {
        return (
            <View style={flexBoxRow.FlexStartCenter}>
                {checkboxView}
                <HelperText textContainer={props.helpText} style={{ flexDirection: 'row' }} />
                {errorMessages}
            </View>

        );
    }

    if ((Object.keys(props.trueText) || Object.keys(props.falseText)).length == 0) {
        props.trueText.ru = 'Да';
        props.falseText.ru = 'Нет';
    }

    return (
        <>
            {errorMessages}
            <StyledText themeColor={ThemeColor.secColor}>{props.label.text.ru}</StyledText>
            <WithTopDefMg>
                <Radio.Group
                    name="myRadioGroup"
                    accessibilityLabel={props.label.text.ru}
                    //  value={value}
                    defaultValue={value ? props.trueText.ru : props.falseText.ru}
                    onChange={(v) => onChange(v == props.trueText.ru ? true : false)}
                >
                    <Radio value={props.trueText.ru} icon={<CustomIcon />} isDisabled={access == AccessType.Readonly} accessibilityLabel={props.trueText.ru}>
                        {props.trueText.ru}
                    </Radio>
                    <WithTopSmallMg>
                        <Radio value={props.falseText.ru} icon={<CustomIcon />} isDisabled={access == AccessType.Readonly} accessibilityLabel={props.falseText.ru}>
                            {props.falseText.ru}
                        </Radio>
                    </WithTopSmallMg>
                </Radio.Group>
            </WithTopDefMg>
        </>
    );
};
