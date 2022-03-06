import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { WidgetData } from '../Interfaces/DataformWidgetsQuery';
import { prepareWidgetId } from '../Page/prepareWidgetId';
import { TableColumnComponent } from './TableColumnComponent';

import type { IModulesMediator } from '../../AppMediator/Interfaces/IModulesMediator';
import type { DataformWidgetsQueryResult, FormObjectWidget } from '../Interfaces/DataformWidgetsQuery';
import type { TableFieldComponentModel } from '../Interfaces/FieldComponent';
import type EventEmitter from 'events';
import { StyledText } from '../Typography/StyledTypography';
import { ThemeColor } from '../../globalStyles/colors/enums/colorTypes';
import { WithTopSmallMg } from '../../globalStyles';

interface ITableComponentView {
    widgetModel: TableFieldComponentModel;
    emitter: EventEmitter;
    mediator: IModulesMediator;
}

export const TableComponentView: React.FC<ITableComponentView> = ({ widgetModel, emitter, mediator }) => {
    const { columns, label } = widgetModel;
    const columnsMap = React.useRef<Map<string, TableColumnComponent>>(new Map());
    const columnKeys = React.useRef<string[]>([]);

    React.useEffect(() => {
        emitter.addListener(`updateTable`, onReferencesRecieved);
        return () => {
            emitter.removeListener(`updateTable`, (data: DataformWidgetsQueryResult | undefined) => onReferencesRecieved(data));
        };
    }, []);

    function onReferencesRecieved(data: DataformWidgetsQueryResult | undefined) {
        if (data) {
            const dict: { [id: string]: [WidgetData, string][] } = {};
            data.objectWidgets.forEach((object) => {
                const obj = object as FormObjectWidget;
                const objWidgetKeys = Object.keys(obj.widgets);
                columnKeys.current.forEach((key) => {
                    if (dict[key] === undefined) {
                        dict[key] = [];
                    }
                    const isIncludes = objWidgetKeys.includes(key);
                    if (isIncludes) {
                        const data = obj.widgets[key];
                        dict[key].push([data, obj.objId]);
                    } else {
                        const data = new WidgetData();
                        dict[key].push([data, obj.objId]);
                    }
                });
            });
            columnsMap.current.forEach((widg, key) => {
                const data = dict[key];
                widg.updateColumn(data);
            });
            columnsMap.current.forEach((widg) => {
                widg.invokeRenderTrigger();
            });
        }
    }

    function renderColumns(): JSX.Element[] {
        const lenght = columns.length;
        const arr = columns.map((col, index) => {
            const column = new TableColumnComponent(col, emitter, mediator, lenght, index);
            const widgetId = prepareWidgetId(col.id);
            columnsMap.current.set(widgetId, column);
            columnKeys.current.push(widgetId);
            return column.create();
        });
        return arr;
    }

    return (
        <View>
            <StyledText themeColor={ThemeColor.secColor}>{!label.hidden && label.text.ru}</StyledText>
            <WithTopSmallMg style={{ flexDirection: 'row' }}>
                <ScrollView horizontal={true}>{renderColumns()}</ScrollView>
            </WithTopSmallMg>
        </View>
    );
};
