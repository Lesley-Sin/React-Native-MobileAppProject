import EventEmitter from 'events';
import { Divider, FormControl } from 'native-base';
import React, { useState } from 'react';
import { KeyboardType, StyleSheet, View } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import Markdown from 'react-native-markdown-display';
import { AccessType } from '../../../Enums/AccessType';
import { ObjectPropertyFormat } from '../../../Enums/ObjectPropertyFirmat';
import { StyledFormControlLabel, StyledFormInput } from '../../../Form/Form';
import { HelperText } from '../../../HelperText/HelperText';
import { WidgetData } from '../../../Interfaces/DataformWidgetsQuery';
import type { ILabel } from '../../../Interfaces/ILabel';
import { TextInputEvent } from '../enums/TextInputEvent';
import { HTMLTextEditorStyles } from '../Styles/HTMLTextEditorStyles';
import { MarkdownStyle } from '../Styles/markdownStyle';

interface ITextInputProps {
    emitter: EventEmitter;
    accessType: AccessType;
    format: ObjectPropertyFormat;
    label: ILabel;
    setChanges: (value: string) => void;
    keyboardType?: KeyboardType;
    id: string;
}

export const TextInputComponent: React.FC<ITextInputProps> = ({ emitter, accessType, format, label, setChanges, id, keyboardType }) => {
    const [value, setValue] = useState<string>('');
    const [access, setAccess] = useState<AccessType>(accessType);
    const [errorMessages, setErrorMessages] = useState<JSX.Element | undefined>()

    React.useEffect(() => {
        emitter.addListener(`${TextInputEvent.UpdateValue}${id}`, (data: WidgetData) => updateComponentData(data));
        emitter.addListener(`${TextInputEvent.SetErrors}${id}`, setErrorMessages);

        return () => {
            emitter.removeAllListeners(`${TextInputEvent.UpdateValue}${id}`);
            emitter.removeAllListeners(`${TextInputEvent.SetErrors}${id}`);
        }

    }, []);

    function updateComponentData(data: WidgetData) {
        if (data) {
            data.values.literal && setValue(data.values.literal as string);
            data.access && setAccess(data.access)
        }
    };


    function getKeyboardType(): KeyboardType {
        if (keyboardType === undefined) {
            return 'default';
        } else return keyboardType;
    }

    function getWrappedView(): JSX.Element {
        const child = getViewByType(format);
        switch (access) {
            case AccessType.Undefined: {
                return <FormControl children={undefined} />;
            }
            case AccessType.Hidden: {
                return (
                    <FormControl style={{ display: 'none' }}>
                        {errorMessages}
                        <StyledFormControlLabel>{label.text.ru}</StyledFormControlLabel>
                        {child}
                    </FormControl>
                );
            }
            case AccessType.Readonly: {
                return (
                    <FormControl isReadOnly={true} isInvalid={false}>
                        {errorMessages}
                        <StyledFormControlLabel>{label.text.ru}</StyledFormControlLabel>
                        {child}
                    </FormControl>
                );
            }
            case AccessType.Required: {
                return (
                    <FormControl isRequired={true} isInvalid={child.props.value === ''}>
                        {errorMessages}
                        <StyledFormControlLabel>{label.text.ru}</StyledFormControlLabel>
                        {child}
                        <FormControl.ErrorMessage>Field is requered</FormControl.ErrorMessage>
                    </FormControl>
                );
            }
            case AccessType.Editable: {
                return (
                    <FormControl isInvalid={false}>
                        {errorMessages}
                        <StyledFormControlLabel>{label.text.ru}</StyledFormControlLabel>
                        {child}
                    </FormControl>
                );
            }
            default:
                return <View />;
        }
    }

    function getHTMLEditorView(): JSX.Element {
        const _editor = React.createRef();
        const [showToolbar, setShowToolbar] = React.useState<boolean>(false);
        function getEditor(): JSX.Element {
            return <>{access === AccessType.Readonly ? <View /> : <QuillEditor style={HTMLTextEditorStyles.editor} ref={_editor} container onFocus={() => setShowToolbar(true)} onBlur={() => setShowToolbar(false)} />}</>;
        }
        const toolbar = {
            root: () => {
                return {
                    // position: 'relative',
                    // display: 'flex',
                    // height: 'auto',
                    // flexWrap: 'wrap',
                };
            },
            toolset: {
                root: () => {
                    return {
                        // paddingTop: 10,
                        // flexDirection: 'column',
                        // borderColor: 'red',
                    };
                },
            },
        };

        function getEditorToolbar(): JSX.Element {
            return (
                <View>
                    <QuillToolbar editor={_editor} /* styles={{ toolbar }} */ options="full" container={'avoiding-view'} theme="light" />
                </View>
            );
        }

        const editor = getEditor();
        const toolbarUi = getEditorToolbar();

        return (
            <View>
                {showToolbar && toolbarUi}
                {editor}
            </View>
        );
    }

    function getMarkdownEditorView(): JSX.Element {
        return (
            <View style={MarkdownStyle.box}>
                <StyledFormInput
                    keyboardType="default"
                    // multiline={this.isMultiline}
                    // onChangeText={(text) => this.handler(text)}
                    value={value}
                    placeholder="Write here"
                    variant="unstyled"
                />
                <Divider />
                <View style={MarkdownStyle.preview}>
                    <Markdown>{value}</Markdown>
                </View>
            </View>
        );
    }

    function getViewByType(type: ObjectPropertyFormat): JSX.Element {
        switch (type) {
            case ObjectPropertyFormat.PlainText: {
                const inputView = getInputView();
                return inputView;
            }
            case ObjectPropertyFormat.HtmlText: {
                const HTMLEditor = getHTMLEditorView();
                return HTMLEditor;
            }
            case ObjectPropertyFormat.MarkedText: {
                const MarkedTextEditor = getMarkdownEditorView();
                return MarkedTextEditor;
            }
            default:
                return <View />;
        }
    }

    function getInputView(): JSX.Element {
        return (
            <StyledFormInput
                // keyboardType={getKeyboardType()}
                // multiline={datasourceInfo.format}
                value={value}
                onChangeText={(text) => {
                    setValue(text);
                }}
                onBlur={() => setChanges(value)}
            />
        );
    }

    return <>{getWrappedView()}</>;
};
