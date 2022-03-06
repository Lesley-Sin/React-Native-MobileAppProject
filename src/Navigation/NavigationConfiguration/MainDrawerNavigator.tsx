import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import type { IMainDrawerProps } from '../Interfaces/IMainDrawerProps';
import { DrawerContentView } from '../NavigationViews/DrawerContentView';
import BottomTabNavigator from './BottomTabNavigationConfiguration/BottomTabNavigator';
import ConversationNavigator from './ConversationScreenNavigator/ConversationScreenNavigator';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator({ mediator, notificationDAL, navigationDAL, searchDAL, myProfileDAL, conversationDAL, pageService, ucmdService }: IMainDrawerProps) {
    const navigation = useNavigation();
    return (
        <>
            <Drawer.Navigator
                drawerPosition="left"
                drawerType="back"
                drawerStyle={{ width: '85%' }}
                //@ts-ignore
                drawerContent={() => <DrawerContentView dataAccessLayer={navigationDAL} />}
                backBehavior="initialRoute"
                // initialRouteName="BottomTabNavigation"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Drawer.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="BottomTabNavigation"
                >
                    {() => <BottomTabNavigator notificationDAL={notificationDAL} mediator={mediator} pageService={pageService} myProfileDAL={myProfileDAL} searchDAL={searchDAL} navigationDAL={navigationDAL} ucmdService={ucmdService} conversationDAL={conversationDAL} />}
                </Drawer.Screen>
                <Drawer.Screen name="ConversationNavigator">{() => <ConversationNavigator mediator={mediator} conversationDAL={conversationDAL} />}</Drawer.Screen>
            </Drawer.Navigator>
        </>
    );
}

export default MainDrawerNavigator;
