import React from 'react';
import { Text, View } from 'react-native';
import { ComponentType } from '../Enums/ComponentType';
import { EmptyView } from '../LayoutComponents/Views/Empty';
import { VerticalLayoutView } from '../LayoutComponents/Views/VerticalLayoutView';
import { FormComponentView } from './Form/FormComponentView';
import { ScrollView } from 'react-native-gesture-handler';
import { DatasetComponent } from './Dataset/DatasetComponent';

import type { DesktopPage } from './Interfaces/DesktopPage';
import type { Form } from '../Interfaces/Form';
import type { BaseComponent } from '../Interfaces/BaseComponent';
import { DataformWidgetsQuery, DataformWidgetsQueryResult, DatasetObjectWidget, DatasetWidgetQuery, FormObjectWidget, FormWidgetQuery, WidgetQuery } from '../Interfaces/DataformWidgetsQuery';
import { PageQuery } from './Interfaces/PageQuery';
import type { Dataset } from './Dataset/Interfaces/DatasetComponent';
import type { IModulesMediator } from '../../AppMediator/Interfaces/IModulesMediator';
import type { IPageService } from './Interfaces/IPageService';
import type { IUserCommandExecutionService } from '../../UserCommandExecutionService/Models/IUserCommandExecutionService';
import type { IDatasetInfo } from './Models/IDatasetInfo';
import { DefaultButton } from '../Buttons/Button';
import { WithTopDefMg } from '../../globalStyles';
import { StyledText } from '../Typography/StyledTypography';
import { prepareWidgetId } from './prepareWidgetId';
import { tempIdPrefix, serverTempIdPrefix } from '../../Common/Models/TempIdPrefix';
import { FilterLeaf } from '../Interfaces/FilterBase';
import { baseDatasetPagingConfig } from './Dataset/Interfaces/BaseDatasetPaging';
import { IPagingConfiguration } from '../../Common/Models/IPagingConfiguration';

export type PageComponentUnion = FormComponentView | EmptyView | DatasetComponent;
export class PageComponent {
    private pageModel!: DesktopPage;
    private parentObject: PageQuery;
    private pageService: IPageService;
    private pageComponents: Array<FormComponentView | DatasetComponent> = [];
    private nodeList: Map<string, PageComponentUnion> = new Map();
    private mediator: IModulesMediator;
    private UCService: IUserCommandExecutionService;
    public datasetConfig: IDatasetInfo | undefined;
    public widgetQueriesData: Array<WidgetQuery> = [];
    public publicId = Math.random();
    public dataformWQ!: DataformWidgetsQuery;

    constructor(pageModel: DesktopPage, parentObject: PageQuery, pageService: IPageService, mediator: IModulesMediator, UCService: IUserCommandExecutionService, datasetConfig?: IDatasetInfo | undefined) {
        this.pageModel = pageModel;
        this.parentObject = parentObject;
        this.pageService = pageService;
        this.mediator = mediator;
        this.UCService = UCService;
        this.datasetConfig = datasetConfig;
    }

    public navigateTo(route: string) {
        this.mediator.navigateTo(route);
    }

    public updatePageComponent(data: DataformWidgetsQueryResult | undefined) {
        if (data) {
            data.objectWidgets.forEach((item) => {
                const component = this.pageComponents.find((comp) => {
                    return item.objId === comp.id;
                });
                if (component instanceof DatasetComponent) {
                    component.updateDataset(item as DatasetObjectWidget);
                } else if (component instanceof FormComponentView) {
                    if (item.toolbar && component.toolbarView) {
                        component.toolbarView.updateComponent(item.toolbar);
                    }
                    component.updateComponents(item as FormObjectWidget);
                }
            });
        }
    };

    public async qData(wq?: DataformWidgetsQuery) {
        if (wq) {
            this.dataformWQ = wq;
            const data = await this.pageService.queryData(wq)
            this.updatePageComponent(data)
        } else {
            const data = await this.pageService.queryData(this.dataformWQ)
            this.updatePageComponent(data)
        }
    };

    public setQueries(queries: Array<WidgetQuery>) {
        queries.forEach((query) => {
            this.widgetQueriesData.push(query);
        });
    };

    public addNodeToList(id: string, node: PageComponentUnion) {
        this.nodeList.set(id, node);
    };

    public async changePage(paging: IPagingConfiguration) {
        const xxx = this.createDataformWidgetQuery() as DatasetWidgetQuery[]
        xxx[0].paging = paging;
        const wq = new DataformWidgetsQuery(xxx)
        await this.qData(wq)
    }

    private createElement(element: BaseComponent) {
        switch (element.type) {
            case ComponentType.Form: {
                const component = new FormComponentView(element as Form, this, this.parentObject, this.pageService, this.UCService, this.mediator);
                this.pageComponents.push(component);
                return component;
            }
            case ComponentType.Dataset: {
                const component = new DatasetComponent(element as Dataset, this, this.pageService, this.mediator, this.UCService, this.datasetConfig);
                this.pageComponents.push(component);
                return component;
            }
            default: {
                return new EmptyView();
            }
        }
    }

    public getModalFormInstance(): FormComponentView | undefined {
        if (this.pageComponents[0] instanceof FormComponentView) {
            return this.pageComponents[0];
        } else {
            const component = this.pageComponents.find((item) => item.instanceType === 'FormComponentView');
            return component && (component as FormComponentView);
        }
    }

    private isTempId(id: string) {
        if (id.startsWith(tempIdPrefix) || id.startsWith(serverTempIdPrefix)) {
            return true;
        } else return false;
    }

    public createDataformWidgetQuery() {
        if (this.pageModel) {
            const widgetQArr: Array<WidgetQuery> = this.pageModel.root.rows.map((component) => {
                if (component.type === ComponentType.Form) {
                    const comp = component as Form
                    const isTemp = this.isTempId(this.parentObject.objectId!)
                    const widgetId = prepareWidgetId(comp.root.id);
                    const rootWidget = new FormWidgetQuery();
                    rootWidget.widgetId = widgetId;
                    rootWidget.objId = isTemp ? null : this.parentObject.objectId;
                    rootWidget.rootObjId = this.parentObject.objectId;
                    rootWidget.tempId = this.parentObject.objectId;
                    rootWidget.rootTempId = this.parentObject.objectId;
                    rootWidget.queryObjectTitle = true;
                    rootWidget.queryObjectToolbar = true;
                    rootWidget.queryChildWidgets = true;
                    rootWidget.widgets = []
                    return rootWidget;
                } else {
                    const dts = component as Dataset;
                    const rootWidget = new DatasetWidgetQuery()
                    rootWidget.widgetId = dts.id;
                    rootWidget.filter = new FilterLeaf();
                    rootWidget.isTimeWalking = false;
                    rootWidget.isPersonal = dts.isPersonal;
                    rootWidget.paging = dts.paging ? dts.paging : baseDatasetPagingConfig;
                    rootWidget.grouping = dts.grouping;
                    rootWidget.sorting = dts.sorting;
                    rootWidget.selectedObjects = [];
                    rootWidget.widgets = dts.columns.map((col) => {
                        const widget = new DatasetWidgetQuery();
                        widget.widgetId = col.dataSourceInfo.id;
                        return widget;
                    })
                    return rootWidget;
                }
            })
            return widgetQArr;
        }
    }

    public create() {
        if (this.pageModel) {
            const root = new VerticalLayoutView(this.pageModel.root, this);
            const children = this.pageModel.root.rows.map((row, index) => {
                const node = this.createElement(row);
                const nodeId = row.id;
                this.addNodeToList(nodeId, node);
                return (
                    <View key={index} >
                        {node.create()}
                    </View>
                )
            });
            return (
                <View >
                    {children}
                </View>
            )
        } else return <View />;
    }
}
