import React from 'react'
import { DatasetWidgetQuery } from '../../Interfaces/DataformWidgetsQuery';
import { FilterLeaf } from '../../Interfaces/FilterBase';
import { Dataset } from "./Interfaces/DatasetComponent";
import { AssociatedRowEventType } from './Enums/AssociatedRowEventType';
import { PagingChangeAction } from './Enums/PagingChangeAction';
import EventEmitter from 'events';
import { ToolbarQuery } from '../Models/ToolbarQuery';
import { DatasetComponentView } from './DatasetComponentView';

import type { IModulesMediator } from '../../../AppMediator/Interfaces/IModulesMediator';
import type { DatasetObjectWidget } from '../../Interfaces/DataformWidgetsQuery';
import type { PageComponent } from '../PageComponent';
import type { DatasetCell } from './DatasetCell';
import type { IPagingConfiguration } from '../../../Common/Models/IPagingConfiguration';
import type { IUserCommandExecutionService } from '../../../UserCommandExecutionService/Models/IUserCommandExecutionService';
import type { IPageService } from '../Interfaces/IPageService';
import type { DatasetCardMap } from './DatasetCardLayout';
import type { IDatasetInfo } from '../Models/IDatasetInfo';
import { baseDatasetPagingConfig } from './Interfaces/BaseDatasetPaging';
import { View } from 'react-native';

export interface addRemoveModel {
  value: boolean,
  id?: string
};

export type DatasetViewType = 'Card' | 'Table';

export class DatasetComponent extends Dataset {
  private UCService: IUserCommandExecutionService
  public page: PageComponent;
  private pageService: IPageService;
  private columnsList: DatasetColumnLayoutView[] = [];
  private mediator: IModulesMediator;
  private cells: Array<DatasetCell> = [];
  private cellsEmitter = new EventEmitter();
  private rowsData!: DatasetObjectWidget;
  private widgetQuery!: DatasetWidgetQuery;
  private contextObjectIds: string[] = [];
  // private pagingConfiguration: IPagingConfiguration;
  private datasetViewType: DatasetViewType = 'Table' //default value
  private cardLayout!: DatasetCardMap;
  private datasetConfig: IDatasetInfo | undefined;
  public instanceType: 'DatasetComponent' = 'DatasetComponent'

  constructor(data: Dataset, page: PageComponent, pageService: IPageService, mediator: IModulesMediator, UCService: IUserCommandExecutionService, datasetConfig: IDatasetInfo | undefined) {
    super()
    this.isPersonal = data.isPersonal;
    this.toolbar = data.toolbar;
    this.pageService = pageService;
    this.id = data.id;
    this.name = data.name
    this.columns = data.columns;
    this.containerId = data.containerId;
    this.filter = data.filter;
    this.grouping = data.grouping;
    this.isLazyLoading = data.isLazyLoading;
    this.isPersonal = data.isPersonal;
    this.paging = data.paging ? data.paging : baseDatasetPagingConfig;
    this.sorting = data.sorting;
    this.viewType = data.viewType
    this.page = page;
    this.mediator = mediator;
    this.UCService = UCService;
    this.datasetConfig = datasetConfig;
    this.cellsEmitter.addListener(`change`, async (data: addRemoveModel) => await this.addOrRemoveId(data))
    this.cellsEmitter.addListener(`changeAll`, async (data: addRemoveModel) => await this.addOrRemoveAll(data))
    this.cellsEmitter.addListener(`changePage`, async (data: number) => await this.changePage(data))
    this.cellsEmitter.addListener(`getToolbar`, async () => await this.emitToolbarUpdate())
  };

  public get _widgetQuery() {
    return this.widgetQuery;
  };

  public get _contextObjectIds() {
    return this.contextObjectIds;
  };

  public set _contextObjectIds(v: string[]) {
    this.contextObjectIds = v;
  };

  public updateDataset(data: DatasetObjectWidget) {
    this.rowsData = data;
    this.cellsEmitter.emit(`update`, this.rowsData)
    this.cellsEmitter.emit(`getToolbar`)
  };


  public addCellToList(cell: DatasetCell) {
    this.cells.push(cell)
  };

  // private async changePageNumber(action: PagingChangeAction) {
  //   if (action === PagingChangeAction.increment) {
  //     this.pagingConfiguration.page++
  //   } else if (this.pagingConfiguration.page != 0) {
  //     this.pagingConfiguration.page--;
  //   };
  //   await this.pageService.queryData()
  // };

  private async changePage(index: number) {
    this.paging.page = index
    await this.page.changePage(this.paging)
  };

  private async emitToolbarUpdate() {
    const tbModel = await this.queryToolbar();
    this.cellsEmitter.emit(`updateToolbar`, tbModel)
  };

  private async queryToolbar() {
    const tbQuery = new ToolbarQuery(this.containerId, this.id, this.contextObjectIds)
    const tb = await this.pageService.getListToolbar(tbQuery);
    return tb
  };

  private async addOrRemoveId(data: addRemoveModel) {
    if (data.id) {
      const element = this.contextObjectIds.find((item) => {
        return item === data.id;
      })
      if (!element) {
        this.contextObjectIds.push(data.id)
      } else {
        const elementIndex = this.contextObjectIds.indexOf(data.id)
        this.contextObjectIds.splice(elementIndex, 1)
      }
    } else return;
    await this.emitToolbarUpdate();
  };

  private async addOrRemoveAll(data: addRemoveModel) {
    if (data) {
      const idArr = this.rowsData.rows.map(row => row.id)
      this.contextObjectIds = idArr;
    } else {
      this.contextObjectIds = [];
    };
    await this.emitToolbarUpdate();
  };

  private changeViewType(v: DatasetViewType): void {
    this.datasetViewType = v;
  }

  public associatedRowEvent(index: number, type: AssociatedRowEventType, value?: any) {
    switch (type) {
      case AssociatedRowEventType.setRowIsSelected: {
        this.cells.forEach((cell) => {
          if (cell.index === index) {
            if (cell.isSelected === false) {
              cell.setIsSelected(true)
            } else {
              cell.setIsSelected(false)

            }
          }
          this.cellsEmitter.emit(`${AssociatedRowEventType.setRowIsSelected}${index}`, cell.isSelected)
        })
      };
      case AssociatedRowEventType.updateCheckbox: {
        if (typeof value === 'boolean') {
          this.updateCheckbox(value, index)
        };
      }
      default: () => { }
    }
  };

  private updateCheckbox(value: boolean, index: number) {
    this.cellsEmitter.emit(`${AssociatedRowEventType.updateCheckbox}${index}`, value)
  };

  public createRootWidgetQuery() {
    const rootWidget = new DatasetWidgetQuery();
    rootWidget.widgetId = this.id;
    rootWidget.filter = new FilterLeaf();
    rootWidget.isTimeWalking = false;
    rootWidget.isPersonal = this.isPersonal;
    rootWidget.paging = this.paging ? this.paging : baseDatasetPagingConfig;
    rootWidget.grouping = this.grouping;
    rootWidget.sorting = this.sorting;
    rootWidget.selectedObjects = [];
    rootWidget.widgets = this.columns.map((col) => {
      const widget = new DatasetWidgetQuery();
      widget.widgetId = col.dataSourceInfo.id;
      return widget;
    })
    return rootWidget;
  };

  public create() {
    this.widgetQuery = this.createRootWidgetQuery();
    return (
      <View key={this.datasetConfig?.id} >
        <DatasetComponentView
          instance={this}
          emitter={this.cellsEmitter}
          ucmdService={this.UCService}
          mediator={this.mediator}
          title={this.name}
          viewType='Table'
          columns={this.columns}
          containerId={this.containerId}
          config={this.datasetConfig}
          paging={this.paging}
        />
      </View>
    )

  };

};