import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Pressable } from 'react-native';
import { IModulesMediator } from '../../../../AppMediator/Interfaces/IModulesMediator';
import { ConversationType } from '../../../../AppState/MessagingHubState/Enums/ConversationType';
import { MessageStatus } from '../../../../AppState/MessagingHubState/Enums/MessageStatus';
import { MessageDetails } from '../../../../AppState/MessagingHubState/Interfaces/MessageDetails';
import { useReduxSelector } from '../../../../AppState/Store';
import PageHeader from '../../../../Components/LayoutComponents/Views/PageHeader';
import { StyledText } from '../../../../Components/Typography/StyledTypography';
import { margins } from '../../../../globalStyles/constants';
import { INotificationDAL } from '../../../../Notifications/Interfaces/INotificationDAL';
import { NotificationView } from '../../../../Notifications/Views/NotificationView';

interface INotificationScreenNavigator {
    mediator: IModulesMediator;
    notificationDAL: INotificationDAL;
}

interface INotificationScreenHeader extends INotificationScreenNavigator {
    navigation: StackNavigationProp<ParamListBase, string>;
}

const NotificationScreenHeader = ({ navigation, notificationDAL, mediator }: INotificationScreenHeader) => {
    const conversations = useReduxSelector((state) => state.MessagingHub.conversations);
    let notArchivedMessages: MessageDetails[] = [];

    conversations.map((item) => {
        if (item.type == ConversationType.System) {
            notArchivedMessages = item?.messages?.filter((item) => item.isArchived == false);
        }
    });

    const headerRight = (
        <Pressable
            style={{ marginRight: margins.deafaultMargins }}
            onPress={() => {
                if (notArchivedMessages != undefined) {
                    notArchivedMessages.forEach((item) => {
                        notificationDAL.changeMessagesStatus([item.id], MessageStatus.Archived);
                    });
                }
                return;
            }}
        >
            <StyledText>Очистить</StyledText>
        </Pressable>
    );

    return <PageHeader title={'Уведомления'} navigation={navigation} burger headerRight={headerRight} mediator={mediator} />;
};

const NotificationScreenNavigator = ({ mediator, notificationDAL }: INotificationScreenNavigator) => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    header: ({ navigation }) => <NotificationScreenHeader navigation={navigation} notificationDAL={notificationDAL} mediator={mediator} />,
                }}
                name={'Notification'}
            >
                {() => <NotificationView dataAccessLayer={notificationDAL} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default NotificationScreenNavigator;
