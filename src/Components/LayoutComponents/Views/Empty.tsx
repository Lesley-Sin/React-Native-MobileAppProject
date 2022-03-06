import React from "react"
import { View, Text } from 'react-native';
import { BaseComponent } from "../../Interfaces/BaseComponent";
import { FieldComponent, FormWidget } from "../../Interfaces/FieldComponent";

import type { WidgetValues } from "../../Interfaces/DataformWidgetsQuery";
import type { FormObjectWidget, WidgetMessage } from "../../Interfaces/DataformWidgetsQuery";
import { FormComponentView } from "../../Page/Form/FormComponentView";

export class EmptyView extends FieldComponent implements FormWidget<any> {
    value: any;
    isChanged: boolean;
    isRequired: boolean;
    parentForm: FormComponentView;
    dateOfChange: number | undefined;
    isValidationFailure: boolean;
    setValue(value: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public instanceType: 'EmptyView' = 'EmptyView'

    updateComponent(values: WidgetValues) {

    }

    addMessageOnForm(widgetMessage: WidgetMessage[]) {

    }

    setValue(value: any): Promise<void> {
        // throw new Error("Method not implemented.");
    }


    create(childrenArray?: BaseComponent[]) {
        return <View />
    }
}