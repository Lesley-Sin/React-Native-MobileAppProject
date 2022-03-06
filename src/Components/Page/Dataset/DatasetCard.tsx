import React from 'react';
import { DatasetCardView } from './DatasetCardView';

import type{ IModulesMediator } from '../../../AppMediator/Interfaces/IModulesMediator';
import type{ RowData } from '../../Interfaces/DataformWidgetsQuery';
import type{ DatasetCardMap } from './DatasetCardLayout';
import type EventEmitter from 'events';

export class DatasetCard {
    private emitter: EventEmitter;
    private model: DatasetCardMap;
    private row: RowData;
    private mediator: IModulesMediator;
    public rowIndex: number;

    constructor(emitter: EventEmitter, model: DatasetCardMap, rowIndex: number, row: RowData, mediator: IModulesMediator) {
        this.emitter = emitter;
        this.model = model;
        this.rowIndex = rowIndex
        this.row = row;
        this.mediator = mediator;
    };

    public create() {
        return <DatasetCardView emitter={this.emitter} model={this.model} rowIndex={this.rowIndex} row={this.row} mediator={this.mediator} />
    };

};