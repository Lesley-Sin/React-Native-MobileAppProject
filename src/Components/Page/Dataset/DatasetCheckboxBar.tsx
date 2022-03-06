import React from 'react';
import { DatasetCheckbox } from './DatasetCheckbox';
import { Cell, HeaderCell } from './styles/DatasetCellViewStyles';
import { AssociatedRowEventType } from './Enums/AssociatedRowEventType';

import type { RowData } from '../../Interfaces/DataformWidgetsQuery';
import type EventEmitter from 'events';
import { radiusScheme } from '../../../globalStyles/constants';
import { View } from 'react-native';

export class DatasetCheckboxBar {
    private rows: RowData[];
    private emitter: EventEmitter;

    constructor(rows: RowData[], emitter: EventEmitter) {
        this.rows = rows;
        this.emitter = emitter;
    }

    private updateAllCheckboxes(value: boolean) {
        this.emitter.emit('changeAll', value);
        this.emitter.emit(AssociatedRowEventType.updateAllCheckboxes, value);
    }

    public create(): [JSX.Element, JSX.Element[]] {
        const cellCheckboxes = this.rows.map((row, index) => {
            return (
                <View key={index} >
                    <Cell style={{ borderRightWidth: 1 }}>
                        <DatasetCheckbox index={index} emitter={this.emitter} id={row.id} key={row.id} />
                    </Cell>
                </View>
            );
        });
        const headerCheckbox = (
            <View key={'headerCell'} >
                <HeaderCell borderRight={1} style={{ borderTopLeftRadius: radiusScheme.defaultDegree }}>
                    <DatasetCheckbox index={-1} emitter={this.emitter} onChange={(value: boolean) => this.updateAllCheckboxes(value)} />
                </HeaderCell>
            </View>
        );
        return [headerCheckbox, cellCheckboxes];
    }
}
