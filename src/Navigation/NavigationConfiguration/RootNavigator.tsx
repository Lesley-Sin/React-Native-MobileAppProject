import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import { toggleRightDrawer } from '../../AppState/DrawerControl/DrawerControlSlice';
import { TargetView } from '../../AppState/DrawerControl/Enums/TargetView';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import LoginScreen from '../../Authentication/Views/LoginScreen';
import AppHeaderProfileMenu from '../../MyProfile/MyProfileViews/Account';
import { NotificationView } from '../../Notifications/Views/NotificationView';
import { SearchBar } from '../../Search/Views/SearchBar';
import { IRootNavigatorProps } from '../Interfaces/IRootNavigator';
import MainDrawerNavigator from './MainDrawerNavigator';

const Stack = createStackNavigator();

function RootNavigator({ mediator, viewModel, searchDAL, notificationDAL, navigationDAL, myProfileDAL, conversationDAL, pageService, ucmdService }: IRootNavigatorProps) {
    const { isOpen, targetView } = useReduxSelector((state) => state.DrawerControl);
    const dispatch = useReduxDispatch();

    function setMenuTargetWidget() {
        switch (targetView) {
            case TargetView.search: {
                return <SearchBar dataAccessLayer={searchDAL} />;
            }
            case TargetView.profile: {
                return <AppHeaderProfileMenu mediator={mediator} />;
            }
            case TargetView.notifications: {
                return <NotificationView dataAccessLayer={notificationDAL} />;
            }
            case TargetView.undefined: {
                return <Text>undefined</Text>;
            }
            default: {
                return <View />;
            }
        }
    }

    return (
        <SideMenu
            menu={setMenuTargetWidget()}
            isOpen={isOpen}
            menuPosition="right"
            allowOverlayPressPropagation={true}
            disableGestures={true}
            onChange={() => {
                if (isOpen) {
                    dispatch(toggleRightDrawer(false));
                }
            }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login">{() => <LoginScreen viewModel={viewModel} />}</Stack.Screen>
                <Stack.Screen name="MainDrawerNavigator">{() => <MainDrawerNavigator mediator={mediator} searchDAL={searchDAL} notificationDAL={notificationDAL} navigationDAL={navigationDAL} myProfileDAL={myProfileDAL} conversationDAL={conversationDAL} pageService={pageService} ucmdService={ucmdService} />}</Stack.Screen>
            </Stack.Navigator>
        </SideMenu>
    );
}

export default RootNavigator;
