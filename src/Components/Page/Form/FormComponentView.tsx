import React from 'react';
import { passConversationObjectId } from '../../../AppState/MessagingHubState/MessagingHubSlice';
import store from '../../../AppState/Store';
import { serverTempIdPrefix, tempIdPrefix } from '../../../Common/Models/TempIdPrefix';
import { PageComponent } from '../PageComponent';
import { ComponentType } from '../../Enums/ComponentType';
import { WidgetDataValueOrigin } from '../../Enums/WidgetDataValueOrigin';
import { StaticContentComponent } from '../../InputFields/StaticContent/StaticContentComponent';
import { ToolbarComponent } from '../../InputFields/Toolbar/ToolbarComponent';
import { FormWidgetQuery, ObjectWidgetsValueChanges, WidgetQuery, WidgetValueChange } from '../../Interfaces/DataformWidgetsQuery';
import { FieldComponent } from '../../Interfaces/FieldComponent';
import { Form } from '../../Interfaces/Form';
import { UserCommandKinds } from '../../Interfaces/Toolbar';
import { EmptyView } from '../../LayoutComponents/Views/Empty';
import { FieldComponentView } from '../../LayoutComponents/Views/FieldComponentView';
import { GroupPanelView } from '../../LayoutComponents/Views/GroupPanelView';
import { HorizontalLayoutView } from '../../LayoutComponents/Views/HorizontalLayoutView';
import { VerticalLayoutView } from '../../LayoutComponents/Views/VerticalLayoutView';
import { WidgetValueValidator } from '../../WidgetValueValidator/WidgetValueValidator';
import { prepareWidgetId } from '../prepareWidgetId';

import type { IPageService } from '../Interfaces/IPageService';
import type { PageQuery } from '../Interfaces/PageQuery';
import type { GroupPanel, HorizontalLayout, VerticalLayout } from '../../Interfaces/LayoutComponent';
import type { Toolbar } from '../../Interfaces/Toolbar';
import type { BaseComponent } from '../../Interfaces/BaseComponent';
import type { FormObjectWidget } from '../../Interfaces/DataformWidgetsQuery';
import type { StaticContentModel, FormWidget } from '../../Interfaces/FieldComponent';
import type { TextInputView } from '../../InputFields/TextComponents/Views/TextInputView';
import type { BooleanComponent } from '../../InputFields/CheckBox/Boolean/BooleanComponent';
import type { IUserCommandExecutionService } from '../../../UserCommandExecutionService/Models/IUserCommandExecutionService';
import { FormType } from '../../Enums/FormType';
import { FormModalLayout, FormLayout } from './FormLayout';
import { ReferenceWidget } from '../../ReferenceFormWidgets/ReferenceWidget';
import { TableFieldComponent } from '../../TableComponent/TableFieldComponent';
import { IModulesMediator } from '../../../AppMediator/Interfaces/IModulesMediator';
import { NumberComponent } from '../../InputFields/Number/NumberComponent';
import { View } from 'react-native';

export type ComponentUnion = VerticalLayoutView | HorizontalLayoutView | FieldComponentView | GroupPanelView | EmptyView | TextInputView | ToolbarComponent | BooleanComponent | Toolbar | StaticContentComponent | ReferenceWidget | TableFieldComponent | NumberComponent;

export class FormComponentView extends Form {
    public instanceType: 'FormComponentView' = 'FormComponentView';
    public formModel: Form;
    pageService: IPageService;
    parentObject: PageQuery;
    parentPage: PageComponent;
    containerId: string;
    formId: string;
    widgetQuery!: FormWidgetQuery;
    private contextObjectIds: string[];
    private changes!: ObjectWidgetsValueChanges;
    private mediator: IModulesMediator;
    private formNodeList: Map<string, ComponentUnion> = new Map();
    private toolbarView!: ToolbarComponent;
    private UCService: IUserCommandExecutionService;
    formAreasArr: [string[], JSX.Element[]] = [[], []];

    constructor(formModel: Form, parentPage: PageComponent, parentObject: PageQuery, pageService: IPageService, UCService: IUserCommandExecutionService, mediator: IModulesMediator) {
        super();
        this.formType = formModel.formType;
        this.parentPage = parentPage;
        this.formModel = formModel;
        this.formId = formModel.id;
        this.parentObject = parentObject;
        this.pageService = pageService;
        this.id = parentObject.objectId!;
        this.pageService = pageService;
        this.UCService = UCService;
        this.containerId = parentObject.containerId;
        this.contextObjectIds = [parentObject.objectId!];
        this.mediator = mediator;
        this.createToolbar();
    }

    public get _widgetQuery() {
        return this.widgetQuery;
    }

    public get _contextObjectIds() {
        return this.contextObjectIds;
    }

    public get _changes() {
        return this.changes;
    }

    private createToolbar() {
        if (this.formModel.toolbar) {
            this.toolbarView = new ToolbarComponent(this.formModel.toolbar, this.UCService, this);
            this.toolbar = this.toolbarView;
            this.addNodeToList(this.formModel.toolbar.id, this.toolbar);
        } else {
            this.toolbarView = new ToolbarComponent(undefined, this.UCService, this);
            this.toolbar = this.toolbarView;
            this.addNodeToList('0', this.toolbar);
        }
    };

    private isTemp(id: string) {
        if (id.startsWith(tempIdPrefix) || id.startsWith(serverTempIdPrefix)) {
            return true;
        } else return false;
    };

    public getChanges(commandKind?: UserCommandKinds) {
        const isTemp = this.isTemp(this.parentObject.objectId!);
        const widgetsMap: Dictionary<WidgetValueChange> = {};
        const objectChanges = new ObjectWidgetsValueChanges();
        objectChanges.objId = isTemp ? null : this.parentObject.objectId!;
        objectChanges.tempId = isTemp ? this.parentObject.objectId! : null;
        objectChanges.typeId = this.containerId;
        objectChanges.commandKind = isTemp ? UserCommandKinds.Create : commandKind;
        if (this.formNodeList.size > 0) {
            this.formNodeList.forEach((node) => {
                if (node instanceof FieldComponent && !(node instanceof FieldComponentView)) {
                    const typedNode = node as FormWidget<Object>;
                    if (typedNode.isRequired) {
                        WidgetValueValidator.validate(typedNode.value);
                    }
                    if (typedNode.isChanged) {
                        const widgetChange = new WidgetValueChange();
                        widgetChange.time = typedNode.dateOfChange;
                        widgetChange.origin = WidgetDataValueOrigin.Manual;
                        if (node.hasComplexValues) {
                            widgetChange.complexValues = {
                                values: typedNode.value,
                                instance: undefined,
                                dependencies: undefined
                            }
                        } else {
                            widgetChange.literal = typedNode.value;
                            if (!widgetChange.literal && widgetChange.literal != false) {
                                widgetChange.clean = true;
                            }
                        }
                        if (typedNode instanceof ReferenceWidget) {
                            widgetChange.literal = undefined;
                            widgetChange.add = typedNode.value[0];
                            widgetChange.rem = typedNode.value[1];
                        }
                        const id = prepareWidgetId(node.id);
                        widgetsMap[id] = widgetChange;
                    }
                }
            });
        }
        const validationResult = WidgetValueValidator.getValidationResult();
        objectChanges.changes = widgetsMap;
        this.changes = objectChanges;
        const result: [boolean, ObjectWidgetsValueChanges] = [validationResult, this.changes];
        return result;
    }

    public hasValidationFailureMessage() {
        let hasFalure = false;

        this.formNodeList?.forEach((node) => {
            if (node instanceof FieldComponent && !(node instanceof FieldComponentView)) {
                const typedNode = node as FormWidget<Object>;
                if (typedNode.isValidationFailure) {
                    hasFalure = true
                }
            }
        })

        return hasFalure
    }

    public updateComponents(formObjectWidget: FormObjectWidget) {
        const ids = Object.keys(formObjectWidget.widgets);
        ids.forEach((id) => {
            const widget = this.formNodeList.get(id);
            if (widget) {
                if (widget instanceof FieldComponent && !(widget instanceof FieldComponentView) && !(widget instanceof StaticContentComponent)) {

                    const widgetMessages = formObjectWidget.widgets[id].messages;
                    if (widgetMessages != [] && widgetMessages) {
                        widget.isValidationFailure = true;
                        widget.addMessageOnForm(widgetMessages)
                    } else {
                        widget.isValidationFailure = false;
                    }
                    widget.updateComponent(formObjectWidget.widgets[id]);
                } else if (widget instanceof GroupPanelView) {
                    widget.updateComponent(formObjectWidget.widgets[id]);
                }
            }
        });
    }

    public addNodeToList(id: string, node: ComponentUnion) {
        const nodeId = prepareWidgetId(id);
        this.formNodeList.set(nodeId, node);
    }

    public createElement(element: BaseComponent) {
        switch (element.type) {
            case ComponentType.VerticalLayout: {
                return new VerticalLayoutView(element as VerticalLayout, this);
            }
            case ComponentType.HorizontalLayout: {
                return new HorizontalLayoutView(element as HorizontalLayout, this, this.formType);
            }
            case ComponentType.ActionButton: {
                const element = new EmptyView();
                return element;
            }
            case ComponentType.CarouselLayout: {
                const element = new EmptyView();
                return element;
            }
            case ComponentType.ColumnLayout: {
                const element = new EmptyView();
                return element;
            }
            case ComponentType.FieldComponent: {
                return new FieldComponentView(element as FieldComponent, this, this.mediator);
            }
            case ComponentType.GroupPanel: {
                const groupPanelView = new GroupPanelView(element as GroupPanel, this, this.UCService, this.formAreasArr);
                return groupPanelView;
            }
            case ComponentType.Icon: {
                const element = new EmptyView();
                return element;
            }
            case ComponentType.StaticContent: {
                return new StaticContentComponent(element as StaticContentModel);
            }
            case ComponentType.TabLayout: {
                const element = new EmptyView();
                return element;
            }
            case ComponentType.TabPanel: {
                const element = new EmptyView();
                return element;
            }
            case ComponentType.Undefined: {
                const element = new EmptyView();
                return element;
            }
            case ComponentType.Dataset: {
                const el = new EmptyView();
                return el;
            }
            case ComponentType.Form: {
                const formModel = element as Form;
                return new VerticalLayoutView(formModel.root, this);
                // return new SubformComponent(element as Form, this);
            }
            default:
                return new EmptyView();
        }
    }
    private getFormQyery(root: VerticalLayout) {
        const isTemp = this.isTemp(this.parentObject.objectId!);
        const rootWidget = new FormWidgetQuery();
        rootWidget.widgetId = prepareWidgetId(root.id);
        rootWidget.objId = isTemp ? null : this.parentObject.objectId;
        rootWidget.rootObjId = this.parentObject.objectId;
        rootWidget.tempId = this.parentObject.objectId;
        rootWidget.rootTempId = this.parentObject.objectId;
        rootWidget.queryObjectTitle = true;
        rootWidget.queryObjectToolbar = true;
        rootWidget.queryChildWidgets = true;
        // const widgets = root.rows.map((row) => {
        //     return this.getWidgetQuery(row);
        // });
        rootWidget.widgets = [];
        return rootWidget;
    }

    public getWidgetQuery(component: BaseComponent) {
        const node = this.createElement(component);
        const widget = new WidgetQuery();
        widget.widgetId = prepareWidgetId(component.id);
        if (node.instanceType === 'HorizontalLayoutView') {
            const elementData = node as HorizontalLayoutView;
            widget.widgets = elementData.components.map((comp) => this.getWidgetQuery(comp));
        } else if (node.instanceType === 'FieldComponentView' || node.instanceType === 'EmptyView' || node.instanceType === 'StaticContentComponent') {
            widget.widgets = [];
        } else {
            const elementData = node as GroupPanel;
            elementData.rows && (widget.widgets = elementData.rows.map((row) => this.getWidgetQuery(row)));
        }
        return widget;
    }

    private navigateToObjectConversation() {
        store.dispatch(passConversationObjectId(this.parentObject.objectId!));
        this.parentPage.navigateTo('Conversation');
    }

    private renderForm() {

    }

    public create() {
        this.widgetQuery = this.getFormQyery(this.formModel.root);
        const toolbar = this.toolbarView?.create();
        this.parentPage.setQueries([this.widgetQuery]);
        const root = new VerticalLayoutView(this.formModel.root, this);
        root.create();
        // const rootView = root.create();
        return (
            <View>
                {this.formType === FormType.ModalForm ? <FormModalLayout root={root} toolbar={toolbar} /> : <FormLayout formAreasView={this.formAreasArr} toolbar={toolbar} root={root} navigateToObjectConversation={() => this.navigateToObjectConversation()} />}
            </View>
        )
    }
}
