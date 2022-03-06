import { faBan, faCheckDouble } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import 'moment/locale/ru';
import { IconButton } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { toggleRightDrawer } from '../../AppState/DrawerControl/DrawerControlSlice';
import { MessageStatus } from '../../AppState/MessagingHubState/Enums/MessageStatus';
import { MessageDetails } from '../../AppState/MessagingHubState/Interfaces/MessageDetails';
import { useReduxDispatch } from '../../AppState/Store';
import { WithCircle } from '../../Components/Boxes/Boxes';
import { StyledFontAwasomeIcon } from '../../Components/Icons/Icons';
import { PageQuery } from '../../Components/Page/Interfaces/PageQuery';
import { StyledSmallText, StyledText } from '../../Components/Typography/StyledTypography';
import { Container, Separator, WtihExSmallMargin } from '../../globalStyles';
import { colorScheme } from '../../globalStyles/constants';
import { flexBoxColumn, flexBoxRow } from '../../globalStyles/flexBox';
import { MyWorkTasksController } from '../../MyWorkTasks/MyWorkTasksController';
import { INotificationItemProps } from '../Interfaces/INotificationItemProps';
import { icons, notificationTypes } from '../meta';
import { NotificateItemStyle, NotificationItemBody, NotificationItemDate, NotificationItemInfo, NotificationItemRight } from './NotificationsStyles/notificateItemStyle';

export const NotificationItem: FC<INotificationItemProps> = ({ message, dataAccessLayer }): JSX.Element => {
    const dispatch = useReduxDispatch();
    const DAL = dataAccessLayer;
    const [pressable, setPressable] = useState<boolean>(false);

    if (message.isArchived) {
        return <View />;
    }

    useEffect(() => {
        if (message.type == notificationTypes.userTask || message.type == notificationTypes.conversation) {
            setPressable(true);
        }
    }, [message.type]);

    message = parseMessage(message);

    //TODO Localize it!
    function parseMessage(message: MessageDetails): MessageDetails {
        const eventsNumber = message.references.length;
        const eventsPluralForm = 'новое уведомление';
        let copyMessage = { ...message };
        switch (copyMessage.type) {
            case notificationTypes.userTask: {
                let eventsContainerType = 'задаче';
                copyMessage.icon = icons.task;
                const notificationTitle = `У вас есть ${eventsNumber} ${eventsPluralForm} в ${eventsContainerType}`;
                copyMessage.title = notificationTitle;
                return copyMessage;
            }
            case notificationTypes.history: //NOTE сейчас нет, но возможно появится
                copyMessage.icon = icons.history;
                copyMessage.title = 'Выполнение операций';
                return copyMessage;
            case notificationTypes.baseNotification:
                copyMessage.icon = icons.from;
                return copyMessage;
            case notificationTypes.license:
                copyMessage.icon = icons.from;
                copyMessage.title = 'лицензия';
                return copyMessage;
            case notificationTypes.conversation: {
                const eventsContainerType = 'обсуждении';
                copyMessage.icon = icons.Conversation;
                const notificationTitle = `У вас есть ${eventsNumber} ${eventsPluralForm} в ${eventsContainerType}`;
                copyMessage.title = notificationTitle;
                return copyMessage;
            }
            default:
                return copyMessage;
        }
    }

    function iconBar(): JSX.Element {
        return (
            <View style={NotificateItemStyle(pressable).view}>
                <IconButton
                    icon={<FontAwesomeIcon icon={faCheckDouble} />}
                    onPress={() => {
                        DAL.changeMessagesStatus([message.id], MessageStatus.Read);
                    }} //TODO переместить в другое место
                />
                <IconButton
                    icon={<FontAwesomeIcon icon={faBan} />}
                    padding={0}
                    style={flexBoxColumn.CenterCenter}
                    onPress={() => {
                        DAL.changeMessagesStatus([message.id], MessageStatus.Archived);
                    }} //TODO и это тоже
                />
            </View>
        );
    }

    function getNotificationItemBody() {
        const getNotificationItemInfo = () => {
            const getTitle = () => {
                if (message.type === notificationTypes.baseNotification) {
                    return message.title;
                }
                return message.parent.title == undefined ? '' : message.parent.title;
            };

            return (
                <>
                    <StyledText color={colorScheme.defaultColors.secColor}>{message.type == notificationTypes.conversation ? message.references.map((reference) => reference.referencedMessage.title.trim()) : message.references.map((reference) => reference.title)}</StyledText>
                    <WtihExSmallMargin>
                        <StyledText color={colorScheme.defaultColors.secColor}>{getTitle()}</StyledText>
                    </WtihExSmallMargin>
                </>
            );
        };

        const getNotificationItemDate = () => {
            return (
                <NotificationItemDate>
                    <StyledSmallText color={colorScheme.conversationsColors.dateColor}>{message.type == notificationTypes.conversation ? message.references.map((reference) => formatDate(reference.referencedMessage.creationDate)) : message.references.map((reference) => formatDate(reference.creationDate))}</StyledSmallText>
                </NotificationItemDate>
            );
        };

        switch (message.type) {
            case notificationTypes.conversation: {
                return (
                    <>
                        <NotificationItemInfo>
                            <Container>
                                <View style={flexBoxRow.SpaceBetweenCenter}>
                                    <NotificationItemRight marginLeft={0}>{getNotificationItemInfo()}</NotificationItemRight>
                                    {getNotificationItemDate()}
                                </View>
                            </Container>
                        </NotificationItemInfo>
                        <Separator />
                    </>
                );
            }
            default:
                return (
                    <>
                        <NotificationItemInfo>
                            <Container>
                                <View style={flexBoxRow.SpaceBetweenCenter}>
                                    <WithCircle backgroundColor={colorScheme.defaultColors.mainColor}>
                                        <StyledFontAwasomeIcon color={colorScheme.defaultColors.secColor} icon={message.icon!} />
                                    </WithCircle>
                                    <NotificationItemRight>{getNotificationItemInfo()}</NotificationItemRight>
                                </View>
                                {getNotificationItemDate()}
                            </Container>
                        </NotificationItemInfo>
                        <Separator marginLeft={50} />
                    </>
                );
        }
    }

    return (
        <Pressable
            onPress={async () => {
                if (pressable) {
                    const json = await MyWorkTasksController.getTask(message.parent.objectId);
                    const container = json?.data?.container?.id;
                    const pageId = json?.data?.formId;
                    const objectId = json?.data?.id;
                    const obj = new PageQuery(container!, pageId, objectId);
                    DAL.notifyMainScreen(obj);
                    dispatch(toggleRightDrawer(false));
                }
            }}
        >
            <NotificationItemBody isRead={message.isRead}>{getNotificationItemBody()}</NotificationItemBody>
        </Pressable>
    );
};

function formatDate(date: Date) {
    return moment(date).format('DD MMMM [в] HH:mm:ss').toString();
}
