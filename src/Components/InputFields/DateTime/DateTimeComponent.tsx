import { DateFieldComponent, FieldComponent, FormWidget } from "../../Interfaces/FieldComponent";
import React from "react"
import { WidgetData, WidgetMessage, WidgetValues } from "../../Interfaces/DataformWidgetsQuery";
import { AccessType } from "../../Enums/AccessType";
import { EventEmitter } from "events";
import { dateTiemErrors, updateDate } from "./Events";
import { DateTimeView } from "./DateTimeView";
import { FormComponentView } from "../../Page/Form/FormComponentView";

export class DateTimeComponent extends FieldComponent implements FormWidget<Date | undefined>{
    public value: Date | undefined;
    public isChanged: boolean = false;
    public instanceType: 'BooleanComponent' = 'BooleanComponent';
    private props: DateFieldComponent;
    public emitter = new EventEmitter();
    public dateOfChange: number | undefined;
    public isValidationFailure!: boolean;

    constructor(props: DateFieldComponent, parentForm: FormComponentView) {
        super();
        this.props = props
        this.id = props.id
        this.isRequired = props.accessType === AccessType.Required ? true : false;
        this.parentForm = parentForm
    }
    addMessageOnForm(widgetMessage: WidgetMessage[]): void {
        this.emitter.emit(`${dateTiemErrors}${this.id}`, this.createValidationFailureMessage(widgetMessage))
    }
    parentForm: FormComponentView;
    isRequired!: boolean;

    updateComponent(widgetData: WidgetData): void {
        if (widgetData) {
            if (widgetData.values) {
                this.value = widgetData.values.literal as Date | undefined
            }
            this.emitter.emit(`${updateDate}${this.id}`, widgetData)
        }
    }
    async setValue(value: Date | undefined) {
        this.value = value;
        this.isChanged = true;
        this.dateOfChange = Date.now()
        await this.formQueryData(this.parentForm)
    }

    create() {
        return (
            <DateTimeView
                format={this.props.dataSourceInfo.format}
                accessType={this.props.accessType}
                emitter={this.emitter}
                id={this.id}
                label={this.props.label}
                helpText={this.props.helpText}
                setValue={(v: Date | undefined) => this.setValue(v)}
            />
        )
    }

}