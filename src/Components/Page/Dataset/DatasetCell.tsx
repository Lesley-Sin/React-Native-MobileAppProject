import React from 'react';
import { DatasetCellView } from './DatasetCellView';

import type { IModulesMediator } from '../../../AppMediator/Interfaces/IModulesMediator';
import type { DataSourceInfo } from '../../Interfaces/DataSourceInfo';
import type { AssociatedRowEventType } from './Enums/AssociatedRowEventType';
import type EventEmitter from 'events';
import { View } from 'react-native';

export class DatasetCell {
    public index: number;
    public columnIndex: number;
    public isSelected: boolean = false;

    private cellObject: Object | null;
    private containerId: string;
    private mediator: IModulesMediator;
    private columnAmount: number;
    private cellsEmitter: EventEmitter;
    // private associatedRowEvent: (index: number, type: AssociatedRowEventType, value?: any) => void;
    private datasourceInfo: DataSourceInfo;
    private linkedObjectId: string;

    constructor(cellObject: Object | null, containerId: string, mediator: IModulesMediator, columnAmount: number, index: number, columnIndex: number, cellsEmitter: EventEmitter, datasourceInfo: DataSourceInfo, linkedObjectId: string) {
        this.cellObject = cellObject;
        this.containerId = containerId;
        this.mediator = mediator;
        this.columnAmount = columnAmount;
        this.index = index;
        this.columnIndex = columnIndex;
        this.cellsEmitter = cellsEmitter;
        this.datasourceInfo = datasourceInfo;
        this.linkedObjectId = linkedObjectId;
        // this.associatedRowEvent = associatedRowEvent;
    }

    public setIsSelected(isSelected: boolean) {
        this.isSelected = isSelected;
    }

    associatedRowEvent(index: number, type: AssociatedRowEventType, value?: any) {

    }


    public createCell() {
        return (
            <View key={this.datasourceInfo.id}>
                <DatasetCellView
                    object={this.cellObject}
                    coulmnAmount={this.columnAmount}
                    containerId={this.containerId}
                    mediator={this.mediator}
                    index={this.index}
                    columnIndex={this.columnIndex}
                    cellsEmitter={this.cellsEmitter}
                    type={this.datasourceInfo.type}
                    format={this.datasourceInfo.format}
                    linkedObjectId={this.linkedObjectId}
                    associatedRowEvent={(index: number, type: AssociatedRowEventType, value?: any) => this.associatedRowEvent(index, type, value)}
                />
            </View>
        )
    }
}
