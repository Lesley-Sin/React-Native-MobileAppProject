import { faBell as faBellLight, faCog as faCogLight, faHome as faHomeLight, faSearch as faSearchLight, faUserCircle as faUserCircleLight } from '@fortawesome/pro-light-svg-icons';
import { faBell as faBellSolid, faCog as faCogSolid, faHome as faHomeSolid, faSearch as faSearchSolid, faUserCircle as faUserCircleSolid } from '@fortawesome/pro-solid-svg-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { ConversationType } from '../../../AppState/MessagingHubState/Enums/ConversationType';
import { useReduxSelector } from '../../../AppState/Store';
import { NotificationIndicator } from '../../../Components/Badge/Badge';
import { StyledFontAwasomeIcon } from '../../../Components/Icons/Icons';
import { StyledExtraSmallText } from '../../../Components/Typography/StyledTypography';
import { Container, WithBottomBigMg, WithBottomSmallMg } from '../../../globalStyles';
import { colorScheme, margins } from '../../../globalStyles/constants';
import { flexBoxColumn, flexBoxRow } from '../../../globalStyles/flexBox';
import { IMainDrawerProps } from '../../Interfaces/IMainDrawerProps';
import MainScreenNavigator from './ScreenStackNavigator/MainScreenNavigator';
import NotificationScreenNavigator from './ScreenStackNavigator/NotificationScreenNavigator';
import AccountScreenNavigator from './ScreenStackNavigator/ProfileScreenNavigator';
import SearchBarScreenNavigator from './ScreenStackNavigator/SearchBarScreenNavigator';

const Tab = createBottomTabNavigator();
interface ITabNavigator {
    index: number;
}

const TabNavigation = ({ index }: ITabNavigator) => {
    const tabColors = [colorScheme.defaultColors.defaultBackgroundColor, colorScheme.defaultColors.secColor];
    const navigation = useNavigation();
    const { conversations } = useReduxSelector((state) => state.MessagingHub);
    let unreadMessagesCount = conversations.filter((sysConv) => sysConv.type == ConversationType.System).map((conv) => conv.unreadMessagesCount)[0];

    const navigationScreens = [
        { name: 'главная', navigate: 'MainScreenView', icon: [faHomeSolid, faHomeLight], color: tabColors },
        { name: 'Настройки', navigate: 'AccountScreen', icon: [faCogSolid, faCogLight], color: tabColors },
        { name: 'уведомления', navigate: 'NotificationScreen', icon: [faBellSolid, faBellLight], color: tabColors, badge: unreadMessagesCount > 0 && <NotificationIndicator right={-7} amount={unreadMessagesCount} /> /*  : false */ },
        { name: 'Поиск', navigate: 'GlobalSearchScreen', icon: [faSearchSolid, faSearchLight], color: tabColors },
    ];

    const tabItems = navigationScreens.map((navigationItem, i) => {
        let icon = navigationScreens[i].icon[1];
        let color = navigationScreens[i].color[1];
        if (i === index) {
            icon = navigationScreens[i].icon[0];
            color = navigationScreens[i].color[0];
        }

        return (
            <View style={[flexBoxColumn.CenterCenter, { width: 70 }]}>
                <WithBottomSmallMg>
                    {navigationItem.badge && navigationItem.badge}
                    <StyledFontAwasomeIcon color={color} icon={icon} />
                </WithBottomSmallMg>
                <StyledExtraSmallText textAlign={'center'} color={color}>
                    {navigationScreens[i].name}
                </StyledExtraSmallText>
            </View>
        );
    });

    return (
        <View style={{ bottom: 0, width: '100%', height: 75, backgroundColor: colorScheme.menuColor.default, paddingTop: margins.exSmallMargin, borderTopColor: colorScheme.formColors.mainColor, borderTopWidth: 2 }}>
            <Container>
                <WithBottomBigMg>
                    <View style={[flexBoxRow.SpaceBetweenStart, { width: '100%' }]}>
                        {tabItems.map((tabItem, i) => (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate(navigationScreens[i].navigate);
                                }}
                            >
                                {tabItem}
                            </Pressable>
                        ))}
                    </View>
                </WithBottomBigMg>
            </Container>
        </View>
    );
};

function BottomTabNavigation({ mediator, searchDAL, notificationDAL, navigationDAL, myProfileDAL, conversationDAL, pageService, ucmdService }: IMainDrawerProps) {
    return (
        <Tab.Navigator screenOptions={{}} tabBarOptions={{}} tabBar={({ state: { index } }) => <TabNavigation index={index} />} initialRouteName="MainScreenView">
            {/* <Tab.Screen name={'Conversation'}>{() => <ConversationView dataAccessLayer={conversationDAL} />}</Tab.Screen> */}
            <Tab.Screen name={'MainScreenView'}>{() => <MainScreenNavigator ucmdService={ucmdService} pageService={pageService} mediator={mediator} />}</Tab.Screen>
            <Tab.Screen name={'AccountScreen'}>{() => <AccountScreenNavigator mediator={mediator} myProfileDAL={myProfileDAL} />}</Tab.Screen>
            <Tab.Screen name={'NotificationScreen'}>{() => <NotificationScreenNavigator mediator={mediator} notificationDAL={notificationDAL} />}</Tab.Screen>
            <Tab.Screen name={'GlobalSearchScreen'}>{() => <SearchBarScreenNavigator mediator={mediator} searchDAL={searchDAL} />}</Tab.Screen>
        </Tab.Navigator>
    );
}

export default BottomTabNavigation;
