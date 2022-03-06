import EventEmitter from 'events';
import React from 'react';
import { View, Text } from 'react-native';
import { DateTimeFormater } from '../../../DateTimeFormater.ts/DateTimeFormatter';
import { DefaultCard } from '../../Boxes/Boxes';
import { ObjectPropertyType } from '../../Enums/ObjectPropertyType';
import { RowData } from '../../Interfaces/DataformWidgetsQuery';
import { StyledSmallText } from '../../Typography/StyledTypography';
import { DatasetCard } from './DatasetCard';
import { DatasetViewType } from './DatasetComponent';
import { DatasetColumnLayout } from './Interfaces/DatasetComponent';
import { IAccountProperty } from './Interfaces/IAccountProperty';

export interface IDatasetCardLayout {
    accountProp: DatasetColumnLayout[];
    durDateTimeProp: DatasetColumnLayout[];
    referenceProp: DatasetColumnLayout[];
    commonRows: DatasetColumnLayout[];
}

export class DatasetCardMap {
    containerId!: string;
    account: DatasetCardRowLayout[] = []
    common: DatasetCardRowLayout[] = []
    reference: DatasetCardRowLayout[] = []
    durDateTime: DatasetCardRowLayout[] = []
}

export class DatasetCardLayout {
    private model: DatasetColumnLayout[];
    private rows!: RowData[];
    private emitter: EventEmitter;
    public layoutModel = new DatasetCardMap();
    public datasetViewType: DatasetViewType = 'Card';
    public cardList: DatasetCard[] = []

    constructor(model: DatasetColumnLayout[], emitter: EventEmitter) {
        this.model = model;
        this.emitter = emitter;
    };

    public modelMapping() {
        this.layoutModel.containerId = this.model[0].dataSourceInfo.ownedByContainer;
        this.model.forEach((item, columnIndex) => {
            switch (item.dataSourceInfo.type) {
                case ObjectPropertyType.AccountProperty: {
                    const layout = new DatasetCardRowLayout(item, columnIndex, this.emitter);
                    this.layoutModel.account.push(layout)
                    break;
                };
                case ObjectPropertyType.Duration:
                case ObjectPropertyType.DateTime: {
                    const layout = new DatasetCardRowLayout(item, columnIndex, this.emitter);
                    this.layoutModel.durDateTime.push(layout);
                    break;
                };
                case ObjectPropertyType.InstanceProperty: {
                    const layout = new DatasetCardRowLayout(item, columnIndex, this.emitter);
                    this.layoutModel.reference.push(layout);
                    break;
                };
                default:
                    const layout = new DatasetCardRowLayout(item, columnIndex, this.emitter);
                    this.layoutModel.common.push(layout);
                    break;
            }
        })
        return this.layoutModel;
    }

}

export class DatasetCardRowLayout {
    data: DatasetColumnLayout;
    type: ObjectPropertyType;
    index: number;
    emitter: EventEmitter

    constructor(data: DatasetColumnLayout, index: number, emitter: EventEmitter) {
        this.data = data;
        this.type = data.dataSourceInfo.type;
        this.index = index;
        this.emitter = emitter;
    };

};