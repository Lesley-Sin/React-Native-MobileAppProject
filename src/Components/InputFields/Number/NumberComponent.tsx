import EventEmitter from "events";
import React from "react";
import { AccessType } from "../../Enums/AccessType";
import { WidgetData, WidgetMessage, WidgetValues } from "../../Interfaces/DataformWidgetsQuery";
import { FieldComponent, FormWidget, NumberFieldComponent } from "../../Interfaces/FieldComponent";
import { FormComponentView } from "../../Page/Form/FormComponentView";
import { numberErrors, updateNumber } from "./Events";
import { NumberView } from "./NumberView";

export class NumberComponent extends FieldComponent implements FormWidget<string | undefined> {
    public instanceType: 'NumberComponent' = 'NumberComponent';
    public props: NumberFieldComponent;
    public emitter = new EventEmitter();

    constructor(props: NumberFieldComponent, parentForm: FormComponentView) {
        super();
        this.props = props
        this.id = props.id
        this.isRequired = props.accessType === AccessType.Required ? true : false;
        this.parentForm = parentForm
    }
    public isValidationFailure!: boolean;
    public dateOfChange: number | undefined;
    public parentForm: FormComponentView;
    public isRequired!: boolean;
    public value: string | undefined;
    public isChanged!: boolean;
    async setValue(value: string | undefined): Promise<void> {
        this.value = value;
        this.isChanged = true;
        this.dateOfChange = Date.now()
        await this.formQueryData(this.parentForm)
    }

    addMessageOnForm(widgetMessage: WidgetMessage[]): void {
        this.emitter.emit(`${numberErrors}${this.id}`, this.createValidationFailureMessage(widgetMessage))
    }

    create() {
        return (
            <NumberView
                props={this.props}
                emitter={this.emitter}
                id={this.id}
                onChange={(v) => { this.setValue(v) }}
            />
        )
    };

    updateComponent(widgetData: WidgetData): void {
        if (widgetData) {
            this.value = widgetData.values.literal as string
            this.emitter.emit(`${updateNumber}${this.id}`, widgetData)
        }
    };

    updateValue(newValue: string) {
        this.value = newValue
        this.emitter.emit(`${updateNumber}${this.id}`, this.value)
    };

};