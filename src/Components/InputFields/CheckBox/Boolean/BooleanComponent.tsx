import React from 'react';
import { FieldComponent, FormWidget } from '../../../Interfaces/FieldComponent';
import { Boolean, IBoolean } from './Boolean';

import type { WidgetData, WidgetMessage, WidgetValues } from '../../../Interfaces/DataformWidgetsQuery';
import { booleanErrors, updateBoolean } from './Events';
import EventEmitter from 'events';
import { AccessType } from '../../../Enums/AccessType';

import type { FormComponentView } from "../../../Page/Form/FormComponentView";

export class BooleanComponent extends FieldComponent implements FormWidget<boolean> {
    public instanceType: 'BooleanComponent' = 'BooleanComponent';
    private props: IBoolean;
    public isChanged = false;
    public value!: boolean;
    public isRequired!: boolean;
    public emitter = new EventEmitter();
    public parentForm: FormComponentView;
    public dateOfChange: number | undefined;
    public isValidationFailure!: boolean;
    constructor(props: IBoolean, parentForm: FormComponentView) {
        super()
        this.props = props;
        this.id = props.id
        this.parentForm = parentForm
        this.isRequired = props.accessType === AccessType.Required ? true : false;
    }


    async setValue(value: boolean) {
        this.value = value;
        this.isChanged = true;
        this.dateOfChange = Date.now()
        await this.formQueryData(this.parentForm)
    };

    addMessageOnForm(widgetMessage: WidgetMessage[]) {
        this.emitter.emit(`${booleanErrors}${this.id}`, this.createValidationFailureMessage(widgetMessage))
    }

    updateComponent(widgetData: WidgetData) {
        if (widgetData) {
            if (widgetData.values) {
                this.value = widgetData.values.literal as boolean;
            } else {
                this.value = false;
            }
            this.emitter.emit(`${updateBoolean}${this.id}`, widgetData);
        }
    }

    updateValue(newValue: boolean) {
        this.value = newValue;
        this.emitter.emit(`${updateBoolean}${this.id}`, this.value);
    }

    public create(): JSX.Element {
        return (
            <Boolean
                props={this.props}
                literal={this.value as boolean}
                onChange={(v) => this.setValue(v)}
                id={this.id}
                emitter={this.emitter}
            />
        );
    }
}
