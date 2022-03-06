import React from 'react';
import { Actionsheet, useDisclose } from 'native-base';
import { faChevronDown, faTimes } from '@fortawesome/pro-light-svg-icons';
import { View, Pressable } from 'react-native';
import { Container, WithTopDefMg } from '../../globalStyles';
import { ThemeColor } from '../../globalStyles/colors/enums/colorTypes';
import { colorScheme, margins } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';
import { StyledCheckBox } from '../../Navigation/NavigationViews/OptionItem';
import { NotificationIndicator } from '../Badge/Badge';
import { StyledFormInput } from '../Form/Form';
import { StyledFontAwasomeIcon } from '../Icons/Icons';
import { StyledSmallText, StyledText } from '../Typography/StyledTypography';
import { ActionsheetBottom, ActionsheetBottomContent, ActionsheetCloseBtn, ActionsheetScrollView, ActionsheetSubmitBtn, OptionCount, ReferenceWidgetInput, ReferenceWidgetInputChevron } from './styles/ReferenceWidgetView';

import type EventEmitter from 'events';
import type { RefWidgetValueType } from './ReferenceWidget';
import type { DataSourceInfo } from '../Interfaces/DataSourceInfo';
import type { ReferenceCollectionData, Reference } from '../../ReferenceEditorDataSourceApi/Models/ReferencecCollectionData';
import { AccessType } from '../Enums/AccessType';
import { ReferenceFieldComponent } from '../Interfaces/FieldComponent';
import { WidgetData } from '../Interfaces/DataformWidgetsQuery';

interface IReferenceWidgetView {
    emitter: EventEmitter;
    model: ReferenceFieldComponent;
    getData: (filter?: string) => Promise<ReferenceCollectionData>;
    onValueChange: (object: RefWidgetValueType) => Promise<void>;
};

interface IListRecordView {
    value: Reference;
    index: number;
    defChecked: boolean;
    isMultivalue: boolean;
    callbackFn: (data: Reference, action?: ReferenceWidgetAction) => Promise<void>;
};

type ReferenceWidgetAction = 'add' | 'rem';

export const ReferenceWidgetView: React.FC<IReferenceWidgetView> = ({ emitter, model, getData, onValueChange }) => {
    const { isMultiValue } = model.dataSourceInfo;
    const { accessType } = model;
    const [records, setRecords] = React.useState<Reference[]>([]);
    const [values, setValues] = React.useState<Reference[]>([]);
    const [access, setAccess] = React.useState<AccessType>(accessType);
    const [inputValue, setInputValue] = React.useState<string>();
    const { isOpen, onOpen, onClose } = useDisclose();
    const refWidgetValues = React.useRef<RefWidgetValueType>([[], []]);

    React.useEffect(() => {
        emitter.addListener(`updateRefValue`, onValuesRecieved);
        getWidgetData();
        return () => {
            emitter.removeAllListeners(`updateRefValue`);
        };
    }, []);

    function onValuesRecieved(widgetData: WidgetData) {
        if (widgetData) {
            setValues(widgetData.values.instances);
            if (widgetData.access) {
                setAccess(widgetData.access)
            };
        };
    };

    async function getWidgetData() {
        const data = await getData();
        setRecords(data.options);
    };

    async function changeValue(value: Reference) {
        const removedItems = values.map((val) => val.id);
        const addedItem = value.id;
        refWidgetValues.current[0] = [addedItem];
        refWidgetValues.current[1] = removedItems;
        setValues([value]);
        await onValueChange(refWidgetValues.current);
    };

    async function applyWidgetChanges(refs: Reference[]) {
        const removedItems = values.map((val) => val.id);
        const addedItems = refs.map((val) => val.id);
        refWidgetValues.current[0] = addedItems;
        refWidgetValues.current[1] = removedItems;
        setValues(refs);
        await onValueChange(refWidgetValues.current);
    };

    async function addRemOperation() {
        await onValueChange(refWidgetValues.current);
    };

    function renderInputValues() {
        if (values && values[0] != undefined) {
            return (
                <View>
                    <StyledSmallText color={colorScheme.defaultColors.secColor}>{values[0].name}</StyledSmallText>
                </View>
            );
        } else return <View />;
    };

    function getAdditionalOptionsCount(): string | undefined {
        if (isMultiValue) {
            const length = values.length;
            if (length > 0) {
                return `+${length - 1}`;
            } else return `+0`
        } else return;
    };

    async function listItemPressHandler(ref: Reference, action?: ReferenceWidgetAction) {
        if (action) {
            const inAddVal = refWidgetValues.current[0].includes(ref.id);
            const inRemVal = refWidgetValues.current[1].includes(ref.id);
            const initVal = values.find((item) => item.id === ref.id);
            switch (action) {
                case 'add': {
                    const inAddVal = refWidgetValues.current[0].includes(ref.id);
                    if (!inAddVal && !initVal) {
                        refWidgetValues.current[0].push(ref.id);
                    }
                    if (inRemVal) {
                        const index = refWidgetValues.current[1].indexOf(ref.id)
                        refWidgetValues.current[1].splice(index, 1)
                    }
                    break;
                };
                case 'rem': {
                    if (inAddVal) {
                        const index = refWidgetValues.current[0].indexOf(ref.id)
                        refWidgetValues.current[0].splice(index, 1)
                    }
                    if (initVal && !inRemVal) {
                        refWidgetValues.current[1].push(ref.id);
                    }
                    break;
                };

                default:
                    break;
            };
        } else {
            await changeValue(ref)
        };
    };

    const optionCount = getAdditionalOptionsCount();

    return (
        <WithTopDefMg>
            <ReferenceWidgetInput onPress={onOpen}>
                <Container>
                    <View style={flexBoxRow.SpaceBetweenCenter}>
                        {renderInputValues()}
                        <View style={flexBoxRow.SpaceBetweenCenter}>
                            {(optionCount && optionCount != '+0') && <NotificationIndicator customStyles={OptionCount.styles} fontSize={14} amount={optionCount} />}
                            <ReferenceWidgetInputChevron>
                                <StyledFontAwasomeIcon size={15} icon={faChevronDown} color={colorScheme.defaultColors.secColor} />
                            </ReferenceWidgetInputChevron>
                        </View>
                    </View>
                </Container>
                {/* <StyledSmallText color="black">{getAdditionalOptionsCount()}</StyledSmallText> */}
            </ReferenceWidgetInput>
            <Actionsheet isOpen={isOpen} onClose={onClose} >
                <Actionsheet.Content p={0} style={{ backgroundColor: colorScheme.defaultColors.mainColor }}>
                    <View style={{ width: '100%' }}>
                        <Container>
                            <ActionsheetCloseBtn>
                                <Pressable onPress={onClose}>
                                    <StyledFontAwasomeIcon color={colorScheme.defaultColors.secColor} icon={faTimes} />
                                </Pressable>
                            </ActionsheetCloseBtn>
                            <ActionsheetSubmitBtn>
                                <Pressable onPress={async () => {
                                    onClose();
                                    await addRemOperation();
                                }} >
                                    <StyledText themeColor={ThemeColor.defaultBackground}>Готово</StyledText>
                                </Pressable>
                            </ActionsheetSubmitBtn>
                            {/* <WithTopDefMg>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {renderSelectedItems()}
                                </ScrollView>
                            </WithTopDefMg> */}
                            <WithTopDefMg>
                                <StyledFormInput
                                    value={inputValue}
                                    placeholder={'Поиск...'}
                                    onChangeText={async (text) => {
                                        setInputValue(text);
                                        const data = await getData(text);
                                        setRecords(data.options);
                                    }}
                                />
                            </WithTopDefMg>
                            <ActionsheetScrollView showsVerticalScrollIndicator={false}>
                                <Container paddingRight={0}>
                                    {records?.map((rec, i) => {
                                        const val = values.find((item) => item.id === rec.id);
                                        return <ListRecordView index={i} value={rec} defChecked={val ? true : false} isMultivalue={isMultiValue} callbackFn={async (data: Reference, action?: ReferenceWidgetAction) => await listItemPressHandler(data, action)} />;
                                    })}
                                </Container>
                            </ActionsheetScrollView>
                        </Container>
                        <ActionsheetBottom>
                            <Container>
                                <ActionsheetBottomContent style={flexBoxRow.SpaceBetweenCenter}>
                                    <Pressable>
                                        <StyledText color={colorScheme.notificationColors.error}>Удалить все </StyledText>
                                    </Pressable>
                                    <Pressable>
                                        <StyledText themeColor={ThemeColor.defaultBackground}>Выбрать все </StyledText>
                                    </Pressable>
                                </ActionsheetBottomContent>
                            </Container>
                        </ActionsheetBottom>
                    </View>
                </Actionsheet.Content>
            </Actionsheet>
        </WithTopDefMg>
    );
};

const ListRecordView: React.FC<IListRecordView> = ({ value, defChecked, isMultivalue, callbackFn, index }) => {
    const [isChecked, setIsChecked] = React.useState(defChecked);
    if (isMultivalue) {
        return (
            <View style={{ marginTop: index > 0 ? margins.deafaultMargins : 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText themeColor={ThemeColor.secColor} key={value.id}>
                        {value.name}
                    </StyledText>
                    <StyledCheckBox
                        isChecked={isChecked}
                        value={value.id}
                        onChange={async () => {
                            isChecked ? await callbackFn(value, 'rem') : await callbackFn(value, 'add');
                            setIsChecked(!isChecked);
                        }}
                        accessibilityLabel={value.id}
                    />
                </View>
            </View>
        );
    } else {
        return (
            <WithTopDefMg>
                <Actionsheet.Item
                    onPress={async () => {
                        await callbackFn(value);
                    }}
                >
                    <StyledText color="black" key={value.id}>
                        {value.name}
                    </StyledText>
                </Actionsheet.Item>
            </WithTopDefMg>
        );
    }
};
