import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { PageQuery } from '../Interfaces/PageQuery';
import { DateTimeFormater } from '../../../DateTimeFormater.ts/DateTimeFormatter';
import { SeverityLevel } from '../../../SharedTypes/SeveretyLevel';
import { useReduxDispatch, useReduxSelector } from '../../../AppState/Store';
import { setListEditingMode } from '../../../AppState/DataFormState/PageServiceSlise';
import { DatasetCheckbox } from './DatasetCheckbox';

import type { IModulesMediator } from '../../../AppMediator/Interfaces/IModulesMediator';
import type { RowData } from '../../Interfaces/DataformWidgetsQuery';
import type { DatasetCardMap } from './DatasetCardLayout';
import type { IAccountProperty } from './Interfaces/IAccountProperty';
import type EventEmitter from 'events';

interface IDatasetCardView {
    emitter: EventEmitter;
    model: DatasetCardMap;
    rowIndex: number;
    row: RowData;
    mediator: IModulesMediator;
};

export const DatasetCardView: React.FC<IDatasetCardView> = ({ emitter, model, rowIndex, row, mediator }) => {
    const [cardData, setCardData] = React.useState<RowData>(row);

    const dispatch = useReduxDispatch();
    const { isEditingMode } = useReduxSelector(state => state.PageService);

    React.useEffect(() => {
        emitter.addListener(`updateCard${rowIndex}`, (row: RowData) => setCardData(row))

        return () => {
            emitter.removeAllListeners(`updateCard${rowIndex}`)
        }
    });

    async function onPress() {
        const pageQ = new PageQuery(model.containerId, undefined, row.id);
        await mediator.notifyMainScreen(pageQ)
    };

    const editModeCheckbox = React.useMemo(() => {
        return <DatasetCheckbox index={rowIndex} emitter={emitter} id={row.id} />
    }, [cardData]);

    function createCard(row: RowData) {
        const accountArr: JSX.Element[] = model.account.map((item) => {
            const account = row.data[item.index] as IAccountProperty
            return <Text>{account.name}</Text>
        })
        const referenceArr: JSX.Element[] = model.reference.map((item) => {
            const ref = row.data[item.index] as string;
            if (ref in SeverityLevel) {
                //severity icon
            }
            return <Text>{ref}</Text>
        })
        const commonArr: JSX.Element[] = model.common.map((item) => {
            const commonValue = row.data[item.index];
            return <Text>{commonValue && commonValue.toString()}</Text>
        })
        const durDateTimeArr: JSX.Element[] = model.durDateTime.map((item) => {
            const date = row.data[item.index] as Date;
            const formatedDate = `${DateTimeFormater.getFormatedDate(item.data.dataSourceInfo.format, date).date} ${DateTimeFormater.getFormatedDate(item.data.dataSourceInfo.format, date).time}`
            return <Text>{formatedDate}</Text>
        })
        return (
            <TouchableOpacity
                onPress={async () => await onPress()}
                onLongPress={() => dispatch(setListEditingMode(isEditingMode ? false : true))}
            >
                <View style={{ flexDirection: 'column', borderStyle: 'solid', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'black' }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        {accountArr}
                        {durDateTimeArr}
                    </View>
                    <View>{commonArr}</View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >{referenceArr}</View>
                </View>
            </TouchableOpacity>
        )
    }


    const cardModelView = React.useMemo(() => {
        if (cardData) {
            return [isEditingMode && editModeCheckbox, createCard(cardData)]
        } else return <ActivityIndicator animating={true} color={'blue'} size={40} />
    }, [cardData, isEditingMode])

    return (
        <View style={{ flexDirection: 'row' }}>
            {cardModelView}
        </View>
    )
}