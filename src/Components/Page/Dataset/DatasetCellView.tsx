import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { PageQuery } from '../Interfaces/PageQuery';
import { Cell } from './styles/DatasetCellViewStyles';
import { StyledSmallText } from '../../Typography/StyledTypography';
import { colorScheme } from '../../../globalStyles/constants';
import { Checkbox } from 'native-base';
import { ObjectPropertyFormat } from '../../Enums/ObjectPropertyFirmat';
import { ObjectPropertyType } from '../../Enums/ObjectPropertyType';
import { DateTimeFormater } from '../../../DateTimeFormater.ts/DateTimeFormatter';
import { useReduxDispatch, useReduxSelector } from '../../../AppState/Store';
import { setListEditingMode } from '../../../AppState/DataFormState/PageServiceSlise';
import { AssociatedRowEventType } from './Enums/AssociatedRowEventType';

import type { IDatasetCellViewProps } from './Interfaces/IDatasetCellViewProps';
import type { IAccountProperty } from './Interfaces/IAccountProperty';
import { MyWorkTasksController } from '../../../MyWorkTasks/MyWorkTasksController';

export function DatasetCellView({ object, containerId, mediator, coulmnAmount, index, columnIndex, cellsEmitter, type, format, linkedObjectId, associatedRowEvent }: IDatasetCellViewProps) {
    const [isSelected, setIsSelected] = React.useState(false);

    const dispatch = useReduxDispatch();
    const { isEditingMode } = useReduxSelector((state) => state.PageService);

    React.useEffect(() => {
        cellsEmitter.addListener(`${AssociatedRowEventType.setRowIsSelected}${index}`, (v: boolean) => setIsSelected(v));
        return () => {
            cellsEmitter.removeListener(`${AssociatedRowEventType.setRowIsSelected}${index}`, () => { });
        };
    }, []);

    let borderLeft = 1;
    let borderRight = 0;
    if (columnIndex === coulmnAmount - 1) {
        borderRight = 1;
    }
    if (isEditingMode && columnIndex === 0) {
        borderLeft = 0;
    }

    function PressableWrapper({ children }: any) {
        return (
            <Pressable
                style={{ backgroundColor: isSelected === true ? '#838383' : 'white' }}
                onPress={async () => {
                    if (containerId.includes('cmw.UserTask')) {
                        const json = await MyWorkTasksController.getTask(linkedObjectId);
                        const container = json?.data?.container?.id;
                        const pageId = json?.data?.formId;
                        const objectId = json?.data?.id;
                        const pageQ = new PageQuery(container!, pageId, objectId);
                        await mediator.notifyMainScreen(pageQ);
                    }
                    if (format === ObjectPropertyFormat.Link && object != null && !isEditingMode) {
                        const pageQ = new PageQuery(containerId, undefined, linkedObjectId);
                        await mediator.notifyMainScreen(pageQ);
                    }
                    // if (isEditingMode) {
                    //     setIsSelected(!isSelected);
                    //     associatedRowEvent(index, AssociatedRowEventType.updateCheckbox, !isSelected);
                    // }
                }}
                onLongPress={() => {
                    dispatch(setListEditingMode(!isEditingMode));
                }}
            >
                {children}
            </Pressable>
        );
    }

    function renderCell() {
        switch (type) {
            case ObjectPropertyType.String: {
                return (
                    <PressableWrapper>
                        <Cell borderLeft={borderLeft} borderRight={borderRight}>
                            <StyledSmallText color={colorScheme.defaultColors.secColor}>{object}</StyledSmallText>
                        </Cell>
                    </PressableWrapper>
                );
            }
            case ObjectPropertyType.InstanceProperty: {
                return (
                    <PressableWrapper>
                        <Cell borderLeft={borderLeft} borderRight={borderRight}>
                            <StyledSmallText color={colorScheme.defaultColors.defaultBackgroundColor}>{object}</StyledSmallText>
                        </Cell>
                    </PressableWrapper>
                );
            }
            case ObjectPropertyType.Boolean: {
                const boolValue = () => {
                    if (object === null || object === false) {
                        return <Checkbox isChecked={false} value={''} isDisabled accessibilityLabel="01" />;
                    } else return <Checkbox isChecked={true} value={''} isDisabled accessibilityLabel="02" />;
                };
                return (
                    <PressableWrapper>
                        <Cell borderLeft={borderLeft} borderRight={borderRight}>
                            {boolValue()}
                        </Cell>
                    </PressableWrapper>
                );
            }
            case ObjectPropertyType.DateTime: {
                const date = object as Date;
                const formatedDate = `${DateTimeFormater.getFormatedDate(format, date).date} ${DateTimeFormater.getFormatedDate(format, date).time}`;
                return (
                    <PressableWrapper>
                        <Cell borderLeft={borderLeft} borderRight={borderRight}>
                            <StyledSmallText color={colorScheme.defaultColors.secColor}>{date && formatedDate}</StyledSmallText>
                        </Cell>
                    </PressableWrapper>
                );
            }
            case ObjectPropertyType.AccountProperty: {
                const accountProp = object as IAccountProperty;
                return (
                    <PressableWrapper>
                        <Cell borderLeft={borderLeft} borderRight={borderRight}>
                            <StyledSmallText color={colorScheme.defaultColors.secColor}>{accountProp.name}</StyledSmallText>
                        </Cell>
                    </PressableWrapper>
                );
            }
            default: {
                return (
                    <PressableWrapper>
                        <Cell borderLeft={borderLeft} borderRight={borderRight} />
                    </PressableWrapper>
                );
            }
        }
    };

    return (
        <View>
            {renderCell()}
        </View>
    );

};
