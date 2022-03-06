import React, { useEffect, useState, FC } from 'react';
import { Button, Input, Divider, ScrollView } from 'native-base';
import { ActivityIndicator, Animated, Easing, Pressable, SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { StyledCheckBox } from './OptionItem';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { setFilter, setSearchString } from '../../AppState/Navigation/NavigationSlice';
import ErrorHandler from '../../ErrorHandler/ErrorHandler';
import { DrawerItemStyle } from './NavigationStyles/drawerContentStyle';
import { WorkspaceItemConstructor } from './WorkspaceItemConstructor';
import { IGetRootNavigationProps } from '../../AppState/Navigation/Interfaces/IGetRootNavigationProps';
import { IDrawerContentViewProps } from '../Interfaces/IDrawerContentViewProps';
import AnimationContext from './AnimationContext/AnimationContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faList } from '@fortawesome/pro-light-svg-icons';
import { IWithToggleAnimation } from '../../globalHooks/Animated/types';
import { interractAnimation } from '../../globalHooks/Animated/withAnimated';
import { Container, WithBottomMg, WithTopBigMg, WithTopDefMg } from '../../globalStyles';
import { marginTop } from 'styled-system';
import { colorScheme, margins } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';
import styled from 'styled-components/native';
import { DefaultButton, StretchedButton } from '../../Components/Buttons/Button';
import Searcher from '../../Components/Searcher/Searcher';
import { MenuContainer } from '../../Components/Boxes/Boxes';
import { Logo } from '../../Components/Logo/Logo';
import { StyledText } from '../../Components/Typography/StyledTypography';
import { BottomMenuLogo } from '../../Components/BottomMenuLogo/BottomMenuLogo';
import { IRoleWorkspaceModel } from '../Interfaces/IRoleWorkspaceModel';
import { TopNavigItemView } from './TopNavigItemView';
import { PageQuery } from '../../Components/Page/Interfaces/PageQuery';
import { useSearcher } from '../../globalHooks/Searccher/useSearcher';

/**
 * @DrawerContentView
 * Функицональный компонент, реализующий представление
 * для навигации.
 */
export const DrawerContentView: FC<IDrawerContentViewProps> = ({ dataAccessLayer }) => {
    // const filter = new NavigationItemModelFilter()
    const optionsArray: string[] = [];
    const DAL = dataAccessLayer;

    const dispatch = useReduxDispatch();
    const { model, filter, workspaceList } = useReduxSelector((state) => state.Navigation);
    const [navigModel, setNavigModel] = React.useState<IRoleWorkspaceModel[]>([]);
    const [topItems, setTopItems] = React.useState<IRoleWorkspaceModel[]>([]);
    const { setField, value } = useSearcher();

    useEffect(() => {
        getNavigationData(null);
    }, []);

    useEffect(() => {
        const workspacesModel: IRoleWorkspaceModel[] = [];
        const topItemsModel: IRoleWorkspaceModel[] = [];
        if (model) {
            model.forEach((workspace) => {
                workspace.solution != undefined ? workspacesModel.push(workspace) : topItemsModel.push(workspace);
            });
        }
        setNavigModel(workspacesModel);
        setTopItems(topItemsModel);
    }, [model]);

    const getNavigationData = async (filter: string[] | null) => {
        try {
            const obj: IGetRootNavigationProps = {
                filter: filter,
                searchString: '',
            };
            await DAL.getNavigationRoot(obj.filter, obj.searchString);
        } catch (error) {
            ErrorHandler.handleError(DrawerContentView.name, getNavigationData.name, error);
        }
    };

    async function textInputHandler(text: string) {
        dispatch(setSearchString(text));
        setField(text);
        const obj: IGetRootNavigationProps = {
            filter: filter,
            searchString: text,
        };
        await DAL.getNavigationRoot(obj.filter, obj.searchString);
    }

    async function saveFiltterChanges() {
        try {
            dispatch(setFilter(optionsArray));
            await getNavigationData(filter);
        } catch (error) {
            ErrorHandler.handleError(DrawerContentView.name, saveFiltterChanges.name, error);
        }
    }

    function topItemsView() {
        return topItems.map((item) => {
            return (
                <WithTopDefMg>
                    <TopNavigItemView model={item} onPress={(query: PageQuery) => DAL.notifyMainScreen(query)} />
                </WithTopDefMg>
            );
        });
    }

    function NavigationOptions() {
        const OptionBody = styled.View``;

        return workspaceList === undefined ? (
            <View />
        ) : (
            workspaceList.map((item) => (
                <WithTopDefMg>
                    <OptionBody style={flexBoxRow.SpaceBetweenCenter}>
                        <StyledCheckBox title={item.name} id={item.id} arr={optionsArray} value={item.id} key={item.id} />
                    </OptionBody>
                </WithTopDefMg>
            ))
        );
    }

    function NavigationItems() {
        return navigModel === undefined ? (
            <View />
        ) : (
            navigModel.map((item, i) => {
                if (i === 0) {
                    return new WorkspaceItemConstructor(item, DAL).onRender();
                }
                return <WithTopDefMg>{new WorkspaceItemConstructor(item, DAL).onRender()}</WithTopDefMg>;
            })
        );
    }

    const translationListConfig: IWithToggleAnimation = {
        duration: 800,
        nativeDriver: false,
        easing: Easing.ease,
        delay: 0,
        outPutRange: [0, 200],
    };

    const [translationListStyles, rangeListNumber, toggleTaranslationListStyles] = interractAnimation(translationListConfig);

    const transformListStyle = { maxHeight: translationListStyles };

    function RenderDrawerContentView() {
        if (model === undefined) {
            return (
                <View style={flexBoxRow.CenterCenter}>
                    <ActivityIndicator animating={true} color="#00BFFF" size={60} />
                </View>
            );
        } else {
            return (
                <SafeAreaView style={DrawerItemStyle.boxField}>
                    <Container>
                        <WithBottomMg>
                            <Logo />
                        </WithBottomMg>

                        <MenuContainer>
                            <View style={flexBoxRow.default}>
                                <View style={DrawerItemStyle.searcherInput}>
                                    <Searcher
                                        customValue={value}
                                        clearField={() => {
                                            textInputHandler('');
                                        }}
                                        onChangeText={(text) => textInputHandler(text)}
                                    />
                                </View>
                                <View style={flexBoxRow.CenterCenter}>
                                    <Pressable>
                                        <FontAwesomeIcon style={{ marginLeft: margins.deafaultMargins }} icon={faList} size={20} color={colorScheme.defaultColors.greyoutColor} />
                                    </Pressable>
                                </View>
                            </View>
                            <ScrollView>{topItemsView()}</ScrollView>
                        </MenuContainer>
                        <WithTopBigMg>
                            <MenuContainer /* style={{marginTop: 20}} */>{NavigationItems()}</MenuContainer>
                        </WithTopBigMg>
                        <WithTopBigMg>
                            <BottomMenuLogo />
                        </WithTopBigMg>
                    </Container>
                </SafeAreaView>
            );
        }
    }

    return <>{RenderDrawerContentView()}</>;
};
