import EventEmitter from 'events';
import { Button } from 'native-base';
import React from 'react'
import { View } from 'react-native'
import { Reference } from '../../ReferenceEditorDataSourceApi/Models/ReferencecCollectionData';
import { ReferenceSettingsModel } from '../../ReferenceEditorDataSourceApi/Models/ReferenceSettingsModel';
import { ReferenceEditorDataSourceApiController } from '../../ReferenceEditorDataSourceApi/ReferenceEditorDataSourceApiController';
import { AccessType } from '../Enums/AccessType';
import { WidgetData, WidgetMessage, WidgetValues } from '../Interfaces/DataformWidgetsQuery';
import { DataSourceInfo } from '../Interfaces/DataSourceInfo';
import { FormWidget, ReferenceFieldComponent } from '../Interfaces/FieldComponent';
import { FormComponent } from '../Interfaces/FormComponent';
import { FormComponentView } from '../Page/Form/FormComponentView';
import { ReferenceWidgetView } from './ReferenceWidgetView';

/** 
    * @RefWidgetValueType
    * represents an tupple of values ​​to fill the fields add, rem in changes model
    * @param- [0] add field
    * @param- [1] rem field
   */
export type RefWidgetValueType = [string[], string[]]
export class ReferenceWidget extends ReferenceFieldComponent implements FormWidget<RefWidgetValueType> {
    model: ReferenceFieldComponent;
    parentForm: FormComponentView;
    value!: RefWidgetValueType;
    isChanged!: boolean;
    isRequired: boolean;
    dateOfChange: number | undefined;
    emitter = new EventEmitter();
    dataSourceInfo: DataSourceInfo;
    isValidationFailure!: boolean;

    constructor(model: ReferenceFieldComponent, parentForm: FormComponentView) {
        super()
        this.id = model.id;
        this.model = model;
        this.parentForm = parentForm;
        this.isRequired = model.accessType === AccessType.Required ? true : false;
        this.dataSourceInfo = model.dataSourceInfo;
    };

    public addMessageOnForm(widgetMessage: WidgetMessage[]): void {

    };

    public updateComponent(widgetData: WidgetData): void {
        this.emitter.emit(`updateRefValue`, widgetData);
    };

    public async setValue(value: RefWidgetValueType): Promise<void> {
        this.value = value;
        this.isChanged = true;
        this.dateOfChange = Date.now();
        await this.formQueryData(this.parentForm)
    };

    private async get(filter?: string) {
        const dtsModel = new ReferenceSettingsModel(
            this.parentForm.parentObject.objectId,
            this.model.dataSourceInfo.id,
            { complexObjectChanges: [], widgetChanges: [] },
            filter
        )
        const result = await ReferenceEditorDataSourceApiController.getByDataSourceId(dtsModel)
        return result
    }

    public create() {
        return (
            <ReferenceWidgetView
                emitter={this.emitter}
                model={this.model}
                onValueChange={async (object: RefWidgetValueType) => await this.setValue(object)}
                getData={async (filter?: string) => await this.get(filter)}
            />
        )
    }

}