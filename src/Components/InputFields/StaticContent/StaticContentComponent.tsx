import React from "react";
import { WidgetValues } from "../../Interfaces/DataformWidgetsQuery";
import { StaticContentModel, FormWidget } from "../../Interfaces/FieldComponent";
import { FormComponentView } from "../../Page/Form/FormComponentView";
import { StaticContentView } from "./StaticContentView";

export class StaticContentComponent extends StaticContentModel {
    public instanceType: 'StaticContentComponent' = 'StaticContentComponent';

    constructor(info: StaticContentModel, parentForm?: FormComponentView) {
        super()
        this.id = info.id;
        this.content = info.content;
    };

    create() {
        return (
            <StaticContentView
                id={this.id}
                content={this.content}
            />
        )
    }


}