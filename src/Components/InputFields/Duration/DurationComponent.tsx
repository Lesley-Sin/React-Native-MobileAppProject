import { WidgetData, WidgetMessage, WidgetValues } from "../../Interfaces/DataformWidgetsQuery";
import { DurationFieldComponent, FieldComponent, FormWidget } from "../../Interfaces/FieldComponent";
import React from "react";
import { AccessType } from "../../Enums/AccessType";
import { DurationView } from "./DurationView";
import EventEmitter from "events";
import { durationEvent, durationErrors } from "./DurationEvents";
import { FormComponentView } from "../../Page/Form/FormComponentView";

export class DurationComponent extends FieldComponent implements FormWidget<string | undefined> {

    public emitter = new EventEmitter();
    public props: DurationFieldComponent;
    public value: string | undefined;
    public isChanged!: boolean;
    public isRequired: boolean;
    public parentForm: FormComponentView;
    public instanceType: "DurationComponent" = "DurationComponent";
    public dateOfChange: number | undefined;
    public isValidationFailure!: boolean;

    constructor(props: DurationFieldComponent, parentForm: FormComponentView) {
        super();
        this.props = props;
        this.id = props.id
        this.parentForm = parentForm
        this.isRequired = props.accessType === AccessType.Required ? true : false;
    }
    addMessageOnForm(widgetMessage: WidgetMessage[]): void {
        this.emitter.emit(`${durationErrors}${this.id}`, this.createValidationFailureMessage(widgetMessage))
    }

    updateComponent(widgetData: WidgetData): void {
        if (widgetData) {
            if (widgetData.values) {
                this.value = widgetData.values.literal as string;
            };
            this.emitter.emit(`${durationEvent}${this.id}`, widgetData);
        };
    };

    async setValue(value: string | undefined) {
        this.value = value;
        this.isChanged = true;
        this.dateOfChange = Date.now()
        await this.formQueryData(this.parentForm)
    }

    create() {
        return (
            <DurationView
                props={this.props}
                emitter={this.emitter}
                id={this.id}
                onChange={(v) => { this.setValue(v) }}
            />
        )
    }
}