import React from 'react';
import { Pressable, View } from 'react-native';
import { radiusScheme, colorScheme } from '../../globalStyles/constants';
import { NotificationIndicator } from '../Badge/Badge';
import { ObjectPropertyFormat } from '../Enums/ObjectPropertyFirmat';
import { Cell, HeaderCell } from '../Page/Dataset/styles/DatasetCellViewStyles';
import { PageQuery } from '../Page/Interfaces/PageQuery';
import { OptionCount } from '../ReferenceFormWidgets/styles/ReferenceWidgetView';
import { StyledSmallText, StyledText } from '../Typography/StyledTypography';

import type EventEmitter from 'events';
import type { DataSourceInfo } from '../Interfaces/DataSourceInfo';
import type { FieldComponent } from '../Interfaces/FieldComponent';
import type { WidgetData } from '../Interfaces/DataformWidgetsQuery';
import type { IModulesMediator } from '../../AppMediator/Interfaces/IModulesMediator';

export class TableColumnComponent {
    private columnModel: FieldComponent;
    private emitter: EventEmitter;
    private columnIndex: number;
    private columnAmount: number;
    private mediator: IModulesMediator;

    constructor(columnModel: FieldComponent, emitter: EventEmitter, mediator: IModulesMediator, columnAmount: number, columnIndex: number) {
        this.columnModel = columnModel;
        this.emitter = emitter;
        this.mediator = mediator;
        this.columnAmount = columnAmount;
        this.columnIndex = columnIndex;
        this.columnModel.dataSourceInfo;
    }

    public invokeRenderTrigger(): void {
        this.emitter.emit(`invokeRender`);
    }

    public updateColumn(data: [WidgetData, string][]): void {
        this.emitter.emit(`updateColumn${this.columnModel.id}`, data);
    }

    public create() {
        return <TableColumnComponentView emitter={this.emitter} mediator={this.mediator} columnModel={this.columnModel} columnAmount={this.columnAmount} columnIndex={this.columnIndex} dataSourceInfo={this.columnModel.dataSourceInfo} />;
    }
}

interface ITableColumnComponentView {
    columnModel: FieldComponent;
    mediator: IModulesMediator;
    emitter: EventEmitter;
    columnIndex: number;
    columnAmount: number;
    dataSourceInfo: DataSourceInfo;
}

const TableColumnComponentView: React.FC<ITableColumnComponentView> = ({ columnModel, emitter, mediator, columnIndex, columnAmount, dataSourceInfo }) => {
    const [trigger, setTrigger] = React.useState(false);
    const [arr, setArr] = React.useState<[WidgetData, string][]>([]);

    React.useEffect(() => {
        emitter.addListener(`updateColumn${columnModel.id}`, async (v: [WidgetData, string][]) => await onWidgetValuesRecieved(v));
        emitter.addListener(`invokeRender`, invokeRenderTrigger);
        return () => {
            emitter.removeAllListeners(`updateColumn${columnModel.id}`);
            emitter.removeAllListeners(`updateColumn${columnModel.id}`);
        };
    }, []);

    async function onWidgetValuesRecieved(widgetData: [WidgetData, string][]) {
        setArr(widgetData);
    }

    function invokeRenderTrigger() {
        setTrigger(!trigger);
    }

    function getBordersWidth(): [number, number] {
        let borderLeft = 1;
        let borderRight = 0;
        if (columnIndex === columnAmount - 1) {
            borderRight = 1;
        }
        if (columnAmount === 0) {
            borderLeft = 0;
        }
        return [borderLeft, borderRight];
    }

    function isLink() {
        return dataSourceInfo.format === ObjectPropertyFormat.Link;
    }

    function PressableWrapper({ children, objectId }: any) {
        return (
            <Pressable
                onPress={async () => {
                    if (isLink()) {
                        const pageQ = new PageQuery(columnModel.dataSourceInfo.targetContainer, undefined, objectId);
                        await mediator.notifyMainScreen(pageQ);
                    }
                }}
            >
                {children}
            </Pressable>
        );
    }

    function getAdditionalOptionsCount(): string | undefined {
        if (dataSourceInfo.isMultiValue) {
            const length = arr.length;
            return `+${length - 1}`;
        } else return;
    }

    const optionCount = getAdditionalOptionsCount();

    const renderCell = React.useMemo(() => {
        const borders = getBordersWidth();
        return arr.map((widgetData) => {
            if (widgetData[0].values === undefined) {
                return (
                    <PressableWrapper objectId={widgetData[1]}>
                        <Cell borderLeft={borders[0]} borderRight={borders[1]} />
                    </PressableWrapper>
                );
            } else {
                if (widgetData[0].values.literal) {
                    return (
                        <PressableWrapper objectId={widgetData[1]}>
                            <Cell borderLeft={borders[0]} borderRight={borders[1]}>
                                <StyledSmallText color={isLink() ? colorScheme.defaultColors.defaultBackgroundColor : colorScheme.defaultColors.secColor}>{widgetData[0].values.literal}</StyledSmallText>
                            </Cell>
                        </PressableWrapper>
                    );
                } else if (widgetData[0].values.instances) {
                    return (
                        <PressableWrapper objectId={widgetData[1]}>
                            <Cell borderLeft={borders[0]} borderRight={borders[1]} style={{ flexDirection: 'row' }}>
                                <StyledSmallText color={isLink() ? colorScheme.defaultColors.defaultBackgroundColor : colorScheme.defaultColors.secColor}>{widgetData[0].values.instances[0].name}</StyledSmallText>
                                {optionCount && <NotificationIndicator customStyles={OptionCount.styles} fontSize={14} amount={optionCount} />}
                            </Cell>
                        </PressableWrapper>
                    );
                }
            }
        });
    }, [arr]);

    return (
        <View>
            <HeaderCell
                style={{
                    borderTopLeftRadius: columnIndex === 0 ? radiusScheme.defaultDegree : 0,
                    borderTopRightRadius: columnIndex === columnAmount - 1 ? radiusScheme.defaultDegree : 0,
                    backgroundColor: colorScheme.defaultColors.defaultBackgroundColor,
                }}
            >
                <StyledText>{columnModel.label.text.ru}</StyledText>
            </HeaderCell>
            {/* <View > */}
            {renderCell}
            {/* </View> */}
        </View>
    );
};
