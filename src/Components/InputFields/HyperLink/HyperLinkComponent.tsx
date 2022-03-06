import EventEmitter from "events";
import React from "react";
import { AccessType } from "../../Enums/AccessType";
import { WidgetData, WidgetMessage, WidgetValues } from "../../Interfaces/DataformWidgetsQuery";
import { FieldComponent, FormWidget, UriFieldComponent } from "../../Interfaces/FieldComponent";
import { FormComponentView } from "../../Page/Form/FormComponentView";
import { HyperLink } from "./HyperLink";
import { hyperLinkEvent, hyperLinkErrors } from "./HyperLinkEvent";

export class HyperLinkComponent extends FieldComponent implements FormWidget<string | undefined>{

    props: UriFieldComponent;
    value: string | undefined;
    isChanged!: boolean;
    isRequired: boolean;
    parentForm: FormComponentView;
    dateOfChange: number | undefined;
    emitter = new EventEmitter();
    isValidationFailure!: boolean;

    constructor(props: UriFieldComponent, parentForm: FormComponentView) {
        super();
        this.props = props;
        this.id = props.id
        this.parentForm = parentForm
        this.isRequired = props.accessType === AccessType.Required ? true : false;
        this.hasComplexValues = true;
    }

    addMessageOnForm(widgetMessage: WidgetMessage[]): void {
        this.emitter.emit(`${hyperLinkErrors}${this.id}`, this.createValidationFailureMessage(widgetMessage))
    }

    updateComponent(widgetData: WidgetData): void {
        if (widgetData) {
            if (widgetData.values) {
                this.value = widgetData.values.complexValues[0].values.values as string | undefined;
            };
            this.emitter.emit(`${hyperLinkEvent}${this.id}`, widgetData);
        };
    };

    async setValue(value: string | undefined): Promise<void> {
        this.value = value;
        this.isChanged = true;
        this.dateOfChange = Date.now()
        await this.formQueryData(this.parentForm)
    }

    create() {
        return (
            <HyperLink
                props={this.props}
                emitter={this.emitter}
                id={this.id}
                onChange={(v) => { this.setValue(v) }}
            />
        )
    }

}