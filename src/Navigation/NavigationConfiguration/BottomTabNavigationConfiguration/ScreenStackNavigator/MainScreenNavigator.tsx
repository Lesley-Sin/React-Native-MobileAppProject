import { faCommentAltDots, faEllipsisHAlt, faPlus, faSearch } from '@fortawesome/pro-light-svg-icons';
import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { IModulesMediator } from '../../../../AppMediator/Interfaces/IModulesMediator';
import { passConversationObjectId } from '../../../../AppState/MessagingHubState/MessagingHubSlice';
import store, { useReduxSelector } from '../../../../AppState/Store';
import { NotificationIndicator } from '../../../../Components/Badge/Badge';
import { StyledIconButton } from '../../../../Components/Buttons/Button';
import { StyledFontAwasomeIcon } from '../../../../Components/Icons/Icons';
import PageHeader from '../../../../Components/LayoutComponents/Views/PageHeader';
import { IPageService } from '../../../../Components/Page/Interfaces/IPageService';
import { colorScheme } from '../../../../globalStyles/constants';
import { flexBoxRow } from '../../../../globalStyles/flexBox';
import MainScreenView from '../../../../MainScreen/Views/MainScreenView';
import ObjectViewScreen from '../../../../MainScreen/Views/ObjectViewScreen';
import { IUserCommandExecutionService } from '../../../../UserCommandExecutionService/Models/IUserCommandExecutionService';
import { getShortTitle } from '../../../helpers/getShortTitle';

interface IMainScreenNavigator {
    mediator: IModulesMediator;
    pageService: IPageService;
    ucmdService: IUserCommandExecutionService;
}

interface IObjectViewHeader {
    navigation: StackNavigationProp<ParamListBase, string>;
}

const ObjectViewHeader = ({ navigation }: IObjectViewHeader) => {
    const { objectId, objectTitle } = useReduxSelector((state) => state.PageService);
    const objectTitleStr = objectTitle ? objectTitle : '';

    const getPageTitle = () => {
        if (objectId) {
            return getShortTitle(objectId);
        }

        return getShortTitle(objectTitleStr);
    };

    const getPageRightButtons = () => {
        if (objectId) {
            return (
                <View style={flexBoxRow.default}>
                    <StyledIconButton
                        pressed={() => {
                            store.dispatch(passConversationObjectId(objectId));
                            navigation.navigate('ConversationNavigator');
                        }}
                        icon={<StyledFontAwasomeIcon color={colorScheme.defaultColors.mainColor} icon={faCommentAltDots} />}
                    />
                    <StyledIconButton pressed={() => {}} icon={<StyledFontAwasomeIcon color={colorScheme.defaultColors.mainColor} icon={faSearch} />} />
                </View>
            );
        }
        if (objectTitle) {
            return (
                <View style={flexBoxRow.default}>
                    <StyledIconButton pressed={() => {}} icon={<StyledFontAwasomeIcon color={colorScheme.defaultColors.mainColor} icon={faPlus} />} />
                    <StyledIconButton pressed={() => {}} icon={<StyledFontAwasomeIcon color={colorScheme.defaultColors.mainColor} icon={faEllipsisHAlt} />} />
                </View>
            );
        }
        return <View />;
    };

    return <PageHeader title={getPageTitle()} headerRight={getPageRightButtons()} navigation={navigation} />;
};

const MainScreenNavigator = ({ pageService, mediator, ucmdService }: IMainScreenNavigator) => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator headerMode="screen">
            <Stack.Screen options={{ headerShown: true, header: ({ navigation }) => <PageHeader navigation={navigation} burger mediator={mediator} title={'Главная'} /> }} name={'MainScreenView'}>
                {() => <MainScreenView pageService={pageService} mediator={mediator} ucmdService={ucmdService} />}
            </Stack.Screen>
            <Stack.Screen options={{ header: ({ navigation }) => <ObjectViewHeader navigation={navigation} /> }} name="ObjectViewScreen">
                {() => <ObjectViewScreen pageService={pageService} mediator={mediator} ucmdService={ucmdService} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default MainScreenNavigator;
