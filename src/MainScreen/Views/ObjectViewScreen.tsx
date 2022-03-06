import React from 'react';
import { BackHandler, Platform, Text, View } from 'react-native';
import { Modal } from 'native-base';
import { StyledText } from '../../Components/Typography/StyledTypography';
import { DefaultButton } from '../../Components/Buttons/Button';
import { Stack } from '../../Common/Models/Structures/Stack';
import store, { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { useNavigation } from '@react-navigation/native';

import type { IMainScreenViewProps } from '../Interfaces/IMainScreenViewProps';
import { DesktopPage } from '../../Components/Page/Interfaces/DesktopPage';
import { PageQuery } from '../../Components/Page/Interfaces/PageQuery';
import { IDatasetInfo } from '../../Components/Page/Models/IDatasetInfo';
import { Tabs } from '../../Components/Tabs/Tabs';
import { DataformWidgetsQuery, DataformWidgetsQueryResult } from '../../Components/Interfaces/DataformWidgetsQuery';
import LoadingPlaceholder from '../../Components/LoadindPlaceholder/LoadingPlaceholder';
import { PageComponent } from '../../Components/Page/PageComponent';
import { setObjectId, setObjectTitle } from '../../AppState/DataFormState/PageServiceSlise';

const ObjectViewScreen: React.FC<IMainScreenViewProps> = ({ pageService, mediator, ucmdService }) => {
    const { emitter } = pageService;
    const [showModal, setShowModal] = React.useState(false);
    const [navigHistory, setNavigHistory] = React.useState(new Stack<PageQuery>());
    const [dtsetConfigCache, setDtsetConfigCache] = React.useState<IDatasetInfo[]>();
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [currentDtsetContainerId, setCurrendDtsetContainerId] = React.useState<string>('');
    const { pageIsLoading, isDataLoaded } = useReduxSelector((state) => state.PageService);
    const [pageView, setPageView] = React.useState<JSX.Element>();
    const navigation = useNavigation();

    React.useEffect(() => {
        emitter.addListener('updateScreen', async (data: PageQuery) => await onQueryRecieved(data));
        navigation.addListener('beforeRemove', (e) => {
            if (!navigHistory.isEmpty()) {
                e.preventDefault();
                const pageQ = navigHistory.pop();
                if (pageQ) {
                    pageService.invokePageUpdate(pageQ);
                } else {
                    setPageView(undefined)
                    setDtsetConfigCache(undefined)
                    navigation.goBack()
                }
            };
        });

        return () => {
            emitter.removeAllListeners('updateScreen');
            navigation.removeListener('beforeRemove', (e) => { });
        };
    }, []);

    function exitModalWindow() {
        return (
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content>
                    <View>
                        <StyledText color="black">Закрыть приложение?</StyledText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ margin: 10 }}>
                                <DefaultButton onPress={onApprove}>Закрыть</DefaultButton>
                            </View>
                            <View style={{ margin: 10 }}>
                                <DefaultButton onPress={onCancel}>Отмена</DefaultButton>
                            </View>
                        </View>
                    </View>
                </Modal.Content>
            </Modal>
        );
    }

    async function onQueryRecieved(pageQ: PageQuery, tabIndex = 0) {
        if (navigHistory.has(pageQ) === false) {
            navigHistory.push(pageQ);
        }
        if (pageQ.objectId === undefined) {
            const contId = pageQ.containerId ? pageQ.containerId : pageQ.pageId!;
            setCurrendDtsetContainerId(contId);
        }
        const formData = await pageService.prepareQuery(pageQ);
        // setPageView(undefined);
        if (!Array.isArray(formData)) {
            setActiveIndex(0);
            setDtsetConfigCache(undefined);
            const query = formData.createDataformWidgetQuery();
            const widgetQ = new DataformWidgetsQuery(query!, { widgetChanges: [], complexObjectChanges: [] });
            const view = formData.create();
            setPageView(view);
            await formData.qData(widgetQ);
        } else {
            const pageComponents = formData[0];
            const view = pageComponents[tabIndex].create();
            const configs = formData[1] as IDatasetInfo[];
            const configTitle = configs[tabIndex].name;
            store.dispatch(setObjectTitle(configTitle));

            if (!dtsetConfigCache) {
                setDtsetConfigCache(configs);
            }
            const query = pageComponents[tabIndex].createDataformWidgetQuery();
            const widgetQ = new DataformWidgetsQuery(query!);
            setPageView(view);
            await pageComponents[tabIndex].qData(widgetQ);
        }
    }

    async function onTabPressed(name: string, index: number) {
        setPageView(undefined);
        setActiveIndex(index);
        if (dtsetConfigCache) {
            const pageQ = new PageQuery(currentDtsetContainerId, dtsetConfigCache[index].id);
            await onQueryRecieved(pageQ, index);
        }
    }

    function onCancel() {
        setShowModal(false);
    }

    function onApprove() {
        setShowModal(false);
        BackHandler.exitApp();
    }

    const Page = React.useMemo(() => {
        if (pageView) {
            return pageView
        } else return <View />
    }, [pageView]);

    const datasetTabs = React.useMemo(() => {
        if (dtsetConfigCache) {
            const names = dtsetConfigCache.map((item) => item.name);
            return <Tabs tabsItems={names} activeIndex={activeIndex} pressed={async (name: string, index: number) => await onTabPressed(name, index)} />;
        } else return <View />;
    }, [dtsetConfigCache, activeIndex]);

    return (
        <>
            <View>
                {dtsetConfigCache && dtsetConfigCache.length > 1 && datasetTabs}
            </View>
            {/* {!isDataLoaded && pageIsLoading && <LoadingPlaceholder />} */}
            {pageView && pageView}
        </>
    );
};

export default ObjectViewScreen;
