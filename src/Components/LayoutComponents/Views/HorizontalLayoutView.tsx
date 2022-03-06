import React from 'react';
import { View } from 'react-native';
import { FormType } from '../../Enums/FormType';
import { HorizontalLayout } from '../../Interfaces/LayoutComponent';
import { prepareWidgetId } from '../../Page/prepareWidgetId';

import type { FormComponentView, ComponentUnion } from '../../Page/Form/FormComponentView';

export class HorizontalLayoutView extends HorizontalLayout {
    public instanceType: 'HorizontalLayoutView' = 'HorizontalLayoutView';
    private form!: FormComponentView;
    private childrenNodeList: Map<string, ComponentUnion> = new Map();
    private formType?: FormType;

    constructor(formData: HorizontalLayout, form: FormComponentView, formType: FormType | undefined) {
        super();
        this.components = formData.components;
        this.toolbar = formData.toolbar;
        this.form = form;
        this.id = formData.id;
        this.formType = formType;
    }

    private addToNodeList(id: string, node: ComponentUnion) {
        const nodeId = id.replace('/', '');
        this.childrenNodeList.set(nodeId, node);
    }

    private createChildren(): JSX.Element | JSX.Element[] {
        if (this.components) {
            return this.components.map((item) => {
                const child = this.form.createElement(item);
                const childId = prepareWidgetId(item.id);
                if (child.instanceType === 'FieldComponentView') {
                    const typedChild = child.create()
                    this.addToNodeList(childId, typedChild)
                    this.form.addNodeToList(childId, typedChild)
                    return typedChild.create()
                } else {
                    this.addToNodeList(childId, child)
                    this.form.addNodeToList(childId, child)
                    return child.create();
                }
            });
        } else {
            return <View />;
        }
    }

    public create(): JSX.Element {
        switch (this.formType) {
            case FormType.ModalForm:
                return (
                    <View>
                        <View style={{ flexDirection: 'column' }}>{this.createChildren()}</View>
                    </View>
                );
            default: {
                return (
                    <View>
                        <View style={{ flexDirection: 'row' }}>{this.createChildren()}</View>
                    </View>
                );
            }
        }
    }
}
