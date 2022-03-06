import EventEmitter from 'events';
import React from 'react';
import { View } from 'react-native';
import { WithBottomMg } from '../../../globalStyles';
import type { IUserCommandExecutionService } from '../../../UserCommandExecutionService/Models/IUserCommandExecutionService';
import { ToolbarComponent } from '../../InputFields/Toolbar/ToolbarComponent';
import type { WidgetData, WidgetValues } from '../../Interfaces/DataformWidgetsQuery';
import { GroupPanel } from '../../Interfaces/LayoutComponent';
import type { ComponentUnion, FormComponentView } from '../../Page/Form/FormComponentView';
import { prepareWidgetId } from '../../Page/prepareWidgetId';
import GroupPanelDropdown from './GroupPanelDropdown';

export class GroupPanelView extends GroupPanel {
    public instanceType: 'GroupPanelView' = 'GroupPanelView';
    public text: string;
    public id: string;
    private emitter = new EventEmitter();
    private ucmdService: IUserCommandExecutionService;
    private form!: FormComponentView;
    private childrenNodeList: Map<string, ComponentUnion> = new Map();
    private toolbarView!: ToolbarComponent;
    private formAreasArr: [string[], JSX.Element[]];

    constructor(formData: GroupPanel, form: FormComponentView, ucmdService: IUserCommandExecutionService, formAreasArr: [string[], JSX.Element[]]) {
        super();
        this.text = formData.text.ru; //localized text type here
        this.id = formData.id;
        this.name = formData.name;
        this.rows = formData.rows;
        this.formAreasArr = formAreasArr;
        this.form = form;
        this.toolbar = formData.toolbar;
        this.ucmdService = ucmdService;
    }

    public updateComponent(widgetData: WidgetData): void {
        this.toolbarView.updateComponent(widgetData.toolbar);
    }

    private addToNodeList(id: string, node: ComponentUnion) {
        const nodeId = id.replace('/', '');
        this.childrenNodeList.set(nodeId, node);
    }

    private createToolbar() {
        if (this.toolbar && this.toolbar.items.length > 0) {
            this.toolbarView = new ToolbarComponent(this.toolbar, this.ucmdService, this.form);
            this.addToNodeList(this.toolbar.id, this.toolbarView);
            return <WithBottomMg>{this.toolbarView.create()}</WithBottomMg>;
        }
        return <View />;
    }

    private createChildren(): JSX.Element | JSX.Element[] {
        if (this.rows) {
            return this.rows.map((item) => {
                const child = this.form.createElement(item);
                const childId = prepareWidgetId(item.id);
                if (child.instanceType === 'FieldComponentView') {
                    const typedChild = child.create();
                    this.addToNodeList(childId, typedChild);
                    this.form.addNodeToList(childId, typedChild);
                    return typedChild.create();
                } else {
                    this.addToNodeList(childId, child);
                    this.form.addNodeToList(childId, child);
                    return child.create();
                }
            });
        } else {
            return <View />;
        }
    }

    public create() {
        const groupPanelView = (
            <View style={{ zIndex: 0 }}>
                <GroupPanelDropdown children={[this.createToolbar(), this.createChildren()]} text={this.text} instance={this} emitter={this.emitter} />
            </View>
        );
        this.formAreasArr[0].push(this.text);
        this.formAreasArr[1].push(groupPanelView);
        return groupPanelView;
    }
}
