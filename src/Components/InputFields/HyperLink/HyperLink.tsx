import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState, FC } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import * as Linking from 'expo-linking';
import { checkLinkType, hyperLinkValidator as isValidLink } from './HyperLinkValidator';
import { UriFieldComponent } from '../../Interfaces/FieldComponent';
import EventEmitter from 'events';
import { hyperLinkErrors, hyperLinkEvent } from './HyperLinkEvent';
import { AccessType } from '../../Enums/AccessType';
import { UpperFieldData } from '../../Form/UpperFieldData/UpperFieldData';
import { StyledTextArea } from '../../Form/Form';
import { colorScheme, fontScheme, margins, sizesScheme } from '../../../globalStyles/constants';
import { flexBoxRow } from '../../../globalStyles/flexBox';
import { StyledFontAwasomeIcon } from '../../Icons/Icons';
import { StyledText } from '../../Typography/StyledTypography';
import { HyperLinkBody, HyperLinkInput } from './HyperLinkStyles/HyperLinkStyles';
import { faEdit } from '@fortawesome/pro-light-svg-icons';
import { WidgetData } from '../../Interfaces/DataformWidgetsQuery';

interface HyperLinkProps {
    props: UriFieldComponent;
    emitter: EventEmitter;
    id: string;
    onChange: (value: string | undefined) => void;
}

async function openLink(value: string | undefined) {
    const linkType = checkLinkType(value);
    let link: string | undefined;

    switch (linkType) {
        case 'Mailto':
            link = 'mailto:' + value;
            break;
        case 'Telegram':
            link = 'https://t.me/' + value?.replace('tg://', '');
            break;
        default:
            link = value;
    }
    await Linking.openURL(link ?? '');
}

export const HyperLink: FC<HyperLinkProps> = ({ props, emitter, id, onChange }) => {
    const [value, setValue] = useState<string | undefined>();
    const [access, setAccess] = useState<AccessType>(props.accessType);
    const [isEditable, setIsEditable] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [errorMessages, setErrorMessages] = useState<JSX.Element | undefined>();

    let inputEl = useRef(null);

    if (access == AccessType.Hidden) {
        return <View />;
    }

    useEffect(() => {
        emitter.addListener(`${hyperLinkErrors}${id}`, setErrorMessages);
        emitter.addListener(`${hyperLinkEvent}${id}`, onWidgetDataReceived);

        return () => {
            emitter.removeAllListeners(`${hyperLinkEvent}${id}`);
            emitter.removeAllListeners(`${hyperLinkErrors}${id}`);
        };
    }, []);

    function onWidgetDataReceived(widgetData: WidgetData) {
        if (widgetData.values) {
            setValue(widgetData.values.complexValues[0].values.values as string | undefined);
        };
        if (widgetData.access) {
            setAccess(widgetData.access);
        };
    };

    return (
        <View>
            {errorMessages}
            <UpperFieldData props={props} />
            {validationError &&
                props.dataSourceInfo.allowedUriSchemes.map((schema) => {
                    return <StyledText color={colorScheme.notificationColors.error}>Не соответствует формату {schema}</StyledText>;
                })}
            <Pressable
                onPress={async () => {
                    await openLink(value);
                }}
            >
                <HyperLinkBody>
                    <HyperLinkInput
                        value={value}
                        editable={isEditable}
                        validationError={validationError}
                        underlineColorAndroid="transparent"
                        // multiline={false}
                        onChangeText={(t) => setValue(t)}
                        autoFocus={true}
                        onBlur={() => {
                            onChange(value);
                            setIsEditable(false);
                            let isValid = isValidLink(value, props.dataSourceInfo.allowedUriSchemes);
                            setValidationError(isValid);
                        }}
                        ref={inputEl}
                        //@ts-ignore
                        placeholder={props.placeholder.ru} //TODO localze it, fix ts-ignore
                    />
                    {!(props.accessType == AccessType.Readonly) && (
                        <Pressable
                            style={{ marginRight: margins.smallMargin }}
                            onPress={() => {
                                if (!isEditable) {
                                    setIsEditable(true);
                                }
                                // TODO подумать,как убрать этот костыль
                                //@ts-ignore
                                setTimeout(() => {
                                    inputEl.current.focus();
                                });
                            }}
                        >
                            <StyledFontAwasomeIcon icon={faEdit} color={colorScheme.defaultColors.secColor} />
                        </Pressable>
                    )}
                </HyperLinkBody>
            </Pressable>
        </View>
    );
};
