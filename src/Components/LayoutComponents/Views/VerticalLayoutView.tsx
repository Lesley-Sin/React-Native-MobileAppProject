import React from 'react';
import { View } from 'react-native';
import { ComponentType } from '../../Enums/ComponentType';
import { VerticalLayout } from '../../Interfaces/LayoutComponent';
import { FormFieldView } from './FormFieldView';
import { prepareWidgetId } from '../../Page/prepareWidgetId';

import type { ComponentUnion, FormComponentView } from '../../Page/Form/FormComponentView';
import type { PageComponent, PageComponentUnion } from '../../Page/PageComponent';

export class VerticalLayoutView extends VerticalLayout {
    public instanceType: 'VerticalLayoutView' = 'VerticalLayoutView';
    private formObject!: FormComponentView | PageComponent;
    private childrenNodeList: Map<string, ComponentUnion> = new Map();
    private toolbarView: JSX.Element[] | undefined;

    constructor(formData: VerticalLayout, formObject: PageComponent | FormComponentView, toolbarView?: JSX.Element[]) {
        super();
        this.id = formData.id;
        this.rows = formData.rows;
        this.formObject = formObject;
        this.toolbar = formData.toolbar;
        this.toolbarView = toolbarView;
    }

    private addToNodeList(id: string, node: ComponentUnion) {
        const nodeId = prepareWidgetId(id);
        this.childrenNodeList.set(nodeId, node);
    }

    private createChildren(children?: any[]): JSX.Element | JSX.Element[] {
        if (children === undefined) {
            if (this.rows) {
                return this.rows.map((item, i) => {
                    const child = this.formObject.createElement(item);
                    const childId = prepareWidgetId(item.id);
                    if (child.instanceType === 'FieldComponentView') {
                        const typedChild = child.create();
                        const formChild = typedChild.create();
                        this.addToNodeList(childId, typedChild);
                        this.formObject.addNodeToList(childId, typedChild);
                        return <FormFieldView fieldType={item.fieldType} formChild={formChild} index={i} />;
                    } else {
                        const typedChild = child.create();
                        this.addToNodeList(childId, child);
                        this.formObject.addNodeToList(childId, child);
                        if (item.type === ComponentType.StaticContent) {
                            return <FormFieldView fieldType={item.type} formChild={typedChild} index={i} />;
                        }

                        return typedChild;
                    }
                });
            } else return <View />;
        } else {
            return children.map((component) => {
                return component.create();
            });
        }
    }

    public create(childrenArray?: JSX.Element[]) {
        if (childrenArray === undefined) {
            return (
                <View>
                    <View style={{ flexDirection: 'column' }}>{this.createChildren()}</View>
                </View>
            );
        } else {
            // const verticalChildren = this.createChildren(childrenArray);
            return (
                <View>
                    <View style={{ flexDirection: 'row' }} >{this.toolbarView}</View>
                    <View style={{ flexDirection: 'column' }}>{childrenArray}</View>
                </View>
            );
        }
    }
}
