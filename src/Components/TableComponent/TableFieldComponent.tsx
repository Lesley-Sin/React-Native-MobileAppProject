import React from 'react';
import EventEmitter from 'events';
import { AccessType } from '../Enums/AccessType';
import { DataformWidgetsQuery, FormWidgetQuery, WidgetData } from '../Interfaces/DataformWidgetsQuery';
import { TableFieldComponentModel } from '../Interfaces/FieldComponent';
import { prepareWidgetId } from '../Page/prepareWidgetId';
import { TableComponentView } from './TableComponentView';

import type { IModulesMediator } from '../../AppMediator/Interfaces/IModulesMediator';
import type { Reference } from '../../ReferenceEditorDataSourceApi/Models/ReferencecCollectionData';
import type { FormComponentView } from '../Page/Form/FormComponentView';
import type { FormWidget, } from '../Interfaces/FieldComponent';
import type { WidgetMessage, WidgetValues } from '../Interfaces/DataformWidgetsQuery';

export class TableFieldComponent extends TableFieldComponentModel implements FormWidget<any> {
    public value: any;
    public isChanged: boolean = false;
    public isRequired: boolean;
    public parentForm: FormComponentView;
    public dateOfChange: number | undefined;
    private widgetModel: TableFieldComponentModel;
    private mediator: IModulesMediator;
    public isValidationFailure!: boolean;
    public emitter = new EventEmitter();

    constructor(model: TableFieldComponentModel, parentForm: FormComponentView, mediator: IModulesMediator) {
        super();
        this.widgetModel = model;
        this.parentForm = parentForm;
        this.isRequired = model.accessType === AccessType.Required ? true : false;
        this.mediator = mediator;
        this.emitter.addListener(`getReferencedValues`, async (refs: Reference[]) => await this.queryTableValues(refs))
    }

    public addMessageOnForm(widgetMessage: WidgetMessage[]): void {
        // throw new Error('Method not implemented.');
    };

    public updateComponent(widgetData: WidgetData): void {
        this.emitter.emit(`getReferencedValues`, widgetData.values.instances);
    };

    public async setValue(value: any): Promise<void> {

    };

    private async queryTableValues(refs: Reference[]) {
        let arr: FormWidgetQuery[] = []
        for (let index = 0; index < refs.length; index++) {
            const ref = refs[index];
            const qarr = this.widgetModel.columns.map((col) => {
                const wq = new FormWidgetQuery();
                wq.objId = ref.id;
                wq.rootObjId = this.parentForm.parentObject.objectId;
                wq.widgetId = prepareWidgetId(col.id);
                wq.tempId = undefined;
                wq.widgets = [];
                wq.queryChildWidgets = false;
                wq.queryObjectTitle = false;
                wq.queryObjectToolbar = false;
                return wq
            });
            arr = [...arr, ...qarr]
        }
        const dtfWQ = new DataformWidgetsQuery(arr, { widgetChanges: [], complexObjectChanges: [] })
        const tableData = await this.parentForm.pageService.queryData(dtfWQ);
        this.emitter.emit(`updateTable`, tableData)
    };

    public create(): JSX.Element {
        return <TableComponentView
            emitter={this.emitter}
            widgetModel={this.widgetModel}
            mediator={this.mediator}
        />
    };

};