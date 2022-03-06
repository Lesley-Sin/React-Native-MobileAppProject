import React from "react";
import { ObjectPropertyFormat } from "../../../Enums/ObjectPropertyFirmat";
import { TextFieldComponent, FormWidget } from "../../../Interfaces/FieldComponent";
import { FormComponentView } from "../../../Page/Form/FormComponentView";
import { TextInputEvent } from "../enums/TextInputEvent";
import { TextInputComponent } from "./TextInputComponent";
import { EventEmitter } from "events";
import { AccessType } from "../../../Enums/AccessType";

import type { WidgetData, WidgetMessage } from "../../../Interfaces/DataformWidgetsQuery";
import { prepareWidgetId } from "../../../Page/prepareWidgetId";

export class TextInputView extends TextFieldComponent implements FormWidget<string>  {
    public instanceType: 'TextInputView' = 'TextInputView';
    private format: ObjectPropertyFormat;
    public isChanged: boolean = false;
    public value!: string;
    public isRequired!: boolean;
    public dateOfChange: number | undefined;
    public emitter = new EventEmitter();
    public parentForm: FormComponentView;
    public isValidationFailure!: boolean;
    constructor(
        info: TextFieldComponent,
        parentForm: FormComponentView
    ) {
        super();
        this.id = prepareWidgetId(info.id);
        this.fieldType = info.fieldType;
        this.editorType = info.editorType;
        this.dataSourceInfo = this.dataSourceInfo;
        this.label = info.label;
        this.accessType = info.accessType;
        this.format = info.dataSourceInfo.format;
        this.isRequired = info.accessType === AccessType.Required ? true : false;
        this.parentForm = parentForm
    }


    addMessageOnForm(widgetMessage: WidgetMessage[]): void {
        this.emitter.emit(`${TextInputEvent.SetErrors}${this.id}`, this.createValidationFailureMessage(widgetMessage))
    }

    async setValue(value: string) {
        this.value = value;
        this.isChanged = true;
        this.dateOfChange = Date.now()
        await this.formQueryData(this.parentForm)
    };

    updateComponent(widgetData: WidgetData) {
        if (widgetData) {
            this.value = widgetData.values.literal as string;
            this.emitter.emit(`${TextInputEvent.UpdateValue}${this.id}`, widgetData);
        }
    };

    updateValue(newValue: string) {
        this.value = newValue;
        this.emitter.emit(`${TextInputEvent.UpdateValue}${this.id}`, this.value);
    };

    public create(): JSX.Element {

        return <TextInputComponent
            emitter={this.emitter}
            accessType={this.accessType}
            format={this.format}
            label={this.label}
            setChanges={(value: string) => this.setValue(value)}
            id={this.id}
        />;
    };

}
