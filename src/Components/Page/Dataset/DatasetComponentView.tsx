import { faEllipsisH } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import EventEmitter from 'events';
import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import { IModulesMediator } from '../../../AppMediator/Interfaces/IModulesMediator';
import { useReduxSelector } from '../../../AppState/Store';
import { IPagingConfiguration } from '../../../Common/Models/IPagingConfiguration';
import { Container, WithBottomBigMg, WithTopBigMg, WithTopDefMg } from '../../../globalStyles';
import { ThemeColor } from '../../../globalStyles/colors/enums/colorTypes';
import { colorScheme, margins, paddings, radiusScheme } from '../../../globalStyles/constants';
import { flexBoxRow } from '../../../globalStyles/flexBox';
import { IUserCommandExecutionService } from '../../../UserCommandExecutionService/Models/IUserCommandExecutionService';
import { DefaultButton } from '../../Buttons/Button';
import { StyledFontAwasomeIcon } from '../../Icons/Icons';
import { ToolbarItemView } from '../../InputFields/Toolbar/Interfaces/ToolbarItemView';
import { DatasetObjectWidget, RowData } from '../../Interfaces/DataformWidgetsQuery';
import { StyledSecodaryTitle, StyledSmallText, StyledText } from '../../Typography/StyledTypography';
import { IDatasetInfo } from '../Models/IDatasetInfo';
import { DatasetCell } from './DatasetCell';
import { DatasetCheckboxBar } from './DatasetCheckboxBar';
import { DatasetComponent, DatasetViewType } from './DatasetComponent';
import { DatasetColumnLayout } from './Interfaces/DatasetComponent';
import { HeaderCell } from './styles/DatasetCellViewStyles';

interface IDatasetComponentView {
    emitter: EventEmitter;
    mediator: IModulesMediator;
    instance: DatasetComponent;
    ucmdService: IUserCommandExecutionService;
    title: string;
    viewType: DatasetViewType;
    columns: DatasetColumnLayout[];
    containerId: string;
    config: IDatasetInfo | undefined;
    paging: IPagingConfiguration;
}

interface IDatasetColumnComponent extends Partial<IDatasetComponentView> {
    model: DatasetColumnLayout;
    columnIndex: number;
    columnAmount: number;
}

interface IPagingControllData {
    total: number;
    pageSize: number;
}

interface IPagingButtonView {
    index: number;
    activePageIndex: number;
    onPress: (value: number) => void;
    isLastItem?: boolean;
}

export const DatasetComponentView: React.FC<IDatasetComponentView> = ({ emitter, instance, ucmdService, title, viewType, columns, containerId, mediator, config, paging }) => {
    const [tb, setToolbar] = React.useState<ToolbarItemView[]>([]);
    const [rowData, setRowData] = React.useState<RowData[]>([]);
    const [totalRowsCount, setTotalRowsCount] = React.useState(0);
    const [pageCount, setPageCount] = React.useState(0);
    const [activePageIndex, setActivePageIndex] = React.useState(0);
    const { height, width } = useWindowDimensions();
    const [tableWidth, setTableWidth] = useState<number>(0);

    const { isEditingMode } = useReduxSelector((state) => state.PageService);

    React.useEffect(() => {
        emitter.addListener(`update`, (v: DatasetObjectWidget) => setUpdateData(v));
        emitter.addListener(`updateToolbar`, (newTb: ToolbarItemView[]) => setToolbar(newTb));

        return () => {
            emitter.removeAllListeners(`updateToolbar`);
            emitter.removeAllListeners(`update`);
        };
    }, []);

    function setUpdateData(v: DatasetObjectWidget) {
        setTotalRowsCount(v.totalRowsCount);
        setRowData(v.rows);
    }

    const editModeView = React.useMemo(() => {
        if (rowData) {
            const views = new DatasetCheckboxBar(rowData, emitter!).create()
            return (
                <View style={{ flexDirection: 'column' }} >
                    {views[0]}
                    {views[1]}
                </View>
            )
        } else return <View />;
    }, [rowData]);

    const ColumnViews = React.useMemo(() => {
        const tableWidthArray: number[] = [];
        const amount = columns.length;
        return columns.map((col, index) => {
            return (
                <View
                    key={index}
                    onLayout={({
                        nativeEvent: {
                            layout: { width },
                        },
                    }) => {
                        tableWidthArray.push(width);
                        if (index === columns.length - 1 && tableWidth === 0) {
                            const tableWidthTotal = tableWidthArray.reduce((prev, cur) => prev + cur);
                            setTableWidth(tableWidthTotal);
                        }
                    }}
                    style={{ flexGrow: 1 }}
                >
                    <DatasetColumnComponent model={col} columnIndex={index} columnAmount={amount} containerId={containerId} mediator={mediator} emitter={emitter} />
                </View>
            );
        });
    }, [rowData]);

    const toolbarView = React.useMemo(() => {
        return tb?.map((item, i) => {
            const marginLeft = i > 0 ? margins.smallMargin : 0;
            return (
                <View key={item.id} >
                    <WithTopDefMg style={{ marginLeft: marginLeft }}>
                        <DefaultButton onPress={async () => await ucmdService.handleUserCommandAction(item, instance)}>{item.name}</DefaultButton>
                    </WithTopDefMg>
                </View>
            );
        });
    }, [tb]);

    const PagingView = React.useMemo(() => {
        const maxAmountPagesWithoutDots = 6;
        const maxAmountPagesWithOneDots = 8;
        const lastPageIndexNearDot = 3;

        const PagingButtonView: React.FC<IPagingButtonView> = ({ index, activePageIndex, onPress, isLastItem }) => {
            return (
                <View key={index} >
                    <DefaultButton
                        onPress={() => onPress(index)}
                        style={{
                            backgroundColor: activePageIndex === index ? colorScheme.formColors.paleSelectColor : 'transparent',
                            marginHorizontal: margins.exSmallMargin,
                        }}
                    >
                        <StyledText themeColor={activePageIndex === index ? ThemeColor.secColor : ThemeColor.defaultBackground}>{(index + 1).toString()}</StyledText>
                    </DefaultButton>
                </View>
            );
        };

        if (totalRowsCount === 0) {
            return <View />;
        } else {
            const bum = totalRowsCount / paging.size;

            const pageAmount = Math.floor(bum + 1);

            const isInt = Number.isInteger(bum);
            isInt ? setPageCount(pageAmount) : setPageCount(pageAmount);
            const views: JSX.Element[] = [];

            const getDotsView = () => {
                return (
                    <View>
                        <StyledFontAwasomeIcon style={{ marginBottom: -margins.exSmallMargin }} color={colorScheme.defaultColors.secColor} icon={faEllipsisH} />
                    </View>
                );
            };

            const getPaginationButton = (index: number) => {
                return <PagingButtonView key={index} index={index} activePageIndex={activePageIndex} onPress={(v: number) => onPressPagingButton(v)} />;
            };

            const getPaginationView = (activePageIndex: number, index: number) => {
                switch (true) {
                    case pageCount <= maxAmountPagesWithoutDots:
                        return getPaginationButton(index);
                    case pageCount > maxAmountPagesWithoutDots && pageCount <= maxAmountPagesWithOneDots:
                        switch (true) {
                            case activePageIndex <= lastPageIndexNearDot && index === pageCount - 2:
                            case activePageIndex > lastPageIndexNearDot && index === 1:
                                return getDotsView();
                            default:
                                return getPaginationButton(index);
                        }
                    default:
                        switch (true) {
                            case activePageIndex <= lastPageIndexNearDot && index === pageCount - 2:
                            case activePageIndex >= lastPageIndexNearDot && activePageIndex < pageCount - lastPageIndexNearDot && (index === 1 || index === pageCount - 2):
                            case activePageIndex >= pageCount - lastPageIndexNearDot && index === 1:
                                return getDotsView();
                            case activePageIndex < lastPageIndexNearDot && index > lastPageIndexNearDot && index !== pageCount - 1:
                            case activePageIndex >= lastPageIndexNearDot && index > activePageIndex + 1 && index !== pageCount - 1:
                            case activePageIndex >= lastPageIndexNearDot && activePageIndex <= pageCount - lastPageIndexNearDot && index < activePageIndex - 1 && index !== 0:
                            case activePageIndex >= pageCount - lastPageIndexNearDot && index <= pageCount - 5 && index !== 0:
                                return <></>;
                            default:
                                return getPaginationButton(index);
                        }
                }
            };

            if (pageCount <= 1) {
                return <View />;
            } else {
                for (let index = 0; index < pageCount; index++) {
                    views.push(getPaginationView(activePageIndex, index));
                }

                return <WithTopDefMg style={flexBoxRow.CenterCenter}>{views}</WithTopDefMg>;
            }
        }
    }, [totalRowsCount, activePageIndex, rowData]);

    function onPressPagingButton(pageIndex: number) {
        emitter.emit('changePage', pageIndex);
        setActivePageIndex(pageIndex);
    }

    //NOTE придумать как убрать style={{ paddingBottom: 50 }} в контейнере
    return (
        <View style={{ height: height, backgroundColor: colorScheme.defaultColors.mainColor }}>
            <View style={{ height: 20, backgroundColor: colorScheme.defaultColors.mainColor, zIndex: -1 }} />
            <ScrollView style={{ marginBottom: 130 }}>
                <Container>
                    {/* <View style={{ backgroundColor: colorScheme.menuColor.default }}> */}
                    {/* <DefaultButton
                                onPress={() => {
                                    setType(type === 'Table' ? 'Card' : 'Table');
                                    changeViewType(type);
                                }}
                            >
                                Поменять тип
                            </DefaultButton> */}
                    {/*   <WithTopDefMg>
                            <StyledSecodaryTitle color={colorScheme.defaultColors.secColor}>{title}</StyledSecodaryTitle>
                        </WithTopDefMg> */}
                    <View style={{ flexDirection: 'row' }}>{toolbarView}</View>
                    {/* </View> */}
                    <WithTopDefMg>
                        <View style={flexBoxRow.SpaceBetweenCenter}>
                            <View>{isEditingMode && editModeView}</View>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', width: tableWidth > width - paddings.defaultPaddings * 2 ? 'auto' : '100%', justifyContent: 'space-between' }} horizontal={true}>
                                {ColumnViews}
                            </ScrollView>
                        </View>
                    </WithTopDefMg>
                </Container>
            </ScrollView>
            <View style={{ bottom: 130, width: '100%', backgroundColor: colorScheme.defaultColors.mainColor }}>
                <Container>
                    <View style={{ marginBottom: 30 }}>{PagingView}</View>
                </Container>
            </View>
        </View>
    );
};

const DatasetColumnComponent: React.FC<IDatasetColumnComponent> = ({ model, columnIndex, columnAmount, containerId, mediator, emitter }) => {
    const [cells, setCells] = React.useState<JSX.Element[]>([]);

    const { isEditingMode } = useReduxSelector((state) => state.PageService);

    React.useEffect(() => {
        emitter?.addListener(`update`, (v: DatasetObjectWidget) => setUpdateData(v));

        return () => {
            emitter?.removeListener(`update`, getCellView);
        };
    }, []);

    function setUpdateData(v: DatasetObjectWidget) {
        getCellView(v.rows);
    }

    const getCellView = (rowData: RowData[]) => {
        const cellViews = rowData.map((row, rowIndex) => {
            const obj = row.data[columnIndex];
            const cell = new DatasetCell(obj, containerId!, mediator!, columnAmount, rowIndex, columnIndex, emitter!, model.dataSourceInfo, row.id);
            return (
                <View key={`${row.id}${rowIndex}`}>
                    {cell.createCell()}
                </View>
            )
        });
        setCells(cellViews);
    };

    return (
        <View key={columnIndex} >
            <HeaderCell
                style={{
                    borderTopLeftRadius: columnIndex === 0 && !isEditingMode ? radiusScheme.defaultDegree : 0,
                    borderTopRightRadius: columnIndex === columnAmount - 1 ? radiusScheme.defaultDegree : 0,
                }}
                borderRight={columnIndex !== columnAmount - 1 ? 1 : 0}
            >
                <StyledSmallText>{model.name}</StyledSmallText>
            </HeaderCell>
            {cells}
        </View>
    );
};

