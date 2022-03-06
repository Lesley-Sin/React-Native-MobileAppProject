import EventEmitter from 'events';
import React from 'react';
import { View, Text } from 'react-native';
import { DateTimeFormater } from '../../../DateTimeFormater.ts/DateTimeFormatter';
import { DefaultCard } from '../../Boxes/Boxes';
import { ObjectPropertyType } from '../../Enums/ObjectPropertyType';
import { RowData } from '../../Interfaces/DataformWidgetsQuery';
import { StyledSmallText } from '../../Typography/StyledTypography';
import { IDatasetInfo } from '../Models/IDatasetInfo';
import { DatasetCard } from './DatasetCard';
import { DatasetCell } from './DatasetCell';
import { DatasetViewType } from './DatasetComponent';
import { DatasetColumnLayout } from './Interfaces/DatasetComponent';
import { IAccountProperty } from './Interfaces/IAccountProperty';

export interface IDatasetRowLayout {
    accountProp: DatasetColumnLayout[];
    durDateTimeProp: DatasetColumnLayout[];
    referenceProp: DatasetColumnLayout[];
    commonRows: DatasetColumnLayout[];
}

export class DatasetRowMap {
    datasetCells: DatasetRowViewLayout[];

    constructor() {
        this.datasetCells = []
    }
}

export class DatasetRowLayout {
    private model: DatasetColumnLayout[];
    private rows!: RowData[];
    private emitter: EventEmitter;
    public layoutModel = new DatasetRowMap();

    constructor(model: DatasetColumnLayout[], emitter: EventEmitter) {
        this.model = model;
        this.emitter = emitter;
    };

    public modelMapping() {
        this.model.forEach((item, index) => {
            const x = new DatasetRowViewLayout(item, index, this.emitter)
            this.layoutModel.datasetCells.push(x)
        })
        return this.layoutModel
    }

}

export class DatasetRowViewLayout {
    model: DatasetColumnLayout;
    type: ObjectPropertyType;
    index: number;
    emitter: EventEmitter

    constructor(data: DatasetColumnLayout, index: number, emitter: EventEmitter) {
        this.model = data;
        this.type = data.dataSourceInfo.type;
        this.index = index;
        this.emitter = emitter;
    };

};