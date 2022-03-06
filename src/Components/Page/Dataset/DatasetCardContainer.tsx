import { DatasetCard } from './DatasetCard';

import type { IModulesMediator } from '../../../AppMediator/Interfaces/IModulesMediator';
import type { RowData } from '../../Interfaces/DataformWidgetsQuery';
import type { DatasetCardMap } from './DatasetCardLayout';
import type EventEmitter from 'events';


export class DatasetCardContainer {
    private emitter: EventEmitter;
    private rows: RowData[] | undefined;
    private cardLayout: DatasetCardMap;
    private mediator: IModulesMediator;

    constructor(emitter: EventEmitter, rows: RowData[] | undefined, cardLayout: DatasetCardMap, mediator: IModulesMediator) {
        this.emitter = emitter;
        this.rows = rows;
        this.cardLayout = cardLayout;
        this.mediator = mediator;
    };

    private getCardViews(): JSX.Element[] {
        if (this.rows) {
            return this.rows.map((row, index) => {
                return new DatasetCard(this.emitter, this.cardLayout, index, row, this.mediator).create()
            })
        } else return []
    };

    public create(): JSX.Element[] {
        const cards = this.getCardViews()
        return cards
    };

};