import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import { Divider } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ReferenceType } from '../../AppState/MessagingHubState/Enums/ReferenceType';
import { StyledSmallText, StyledText } from '../../Components/Typography/StyledTypography';
import { Container } from '../../globalStyles';
import { colorScheme, margins, radiusScheme } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';
import { IMessageItemView } from '../Interfaces/IMessageItemView';
import AttacmentItem from './AttacmentItem';
import { MessageItemViewStyle, PressableButton } from './ConversationViewsStyles/messageItemViewStyle';

const MessageItemView: FC<IMessageItemView> = ({
    messages,
    message,
    user,
    setContextMenuPosition,
    setIsContextMenuOpen,
    setActiveMessage,
    contextMenuWidth,
    replyMessage,
    archiveMessage,
    editMessage,
}) => {
    const [isOpenStagger, setIsOpenStagger] = useState<boolean>(false);
    const [contextMenuId, setContextMenuId] = useState<string>('');

    function setIsContextMenu(editConversationMessage: string) {
        setContextMenuId(editConversationMessage);
    }

    const messageBorders = {
        borderTopLeftRadius: message?.creator.id !== user.accountId ? 0 : radiusScheme.bigRadius,
        borderBottomRightRadius: message?.creator.id === user.accountId ? 0 : radiusScheme.bigRadius,
    };

    let messagesStyles = {
        messageBackground: colorScheme.menuColor.default,
        messageUserIcon: (
            <View
                style={{
                    height: 25,
                    width: 25,
                    backgroundColor: colorScheme.dateColors.background.disabled,
                    borderRadius: 100,
                }}
            ></View>
        ),
        messageWidth: '92%',
        userTitle: (
            <View
                style={[
                    MessageItemViewStyle.user,
                    { marginLeft: margins.smallMargin, marginBottom: margins.exSmallMargin },
                ]}
            >
                <StyledText color={message?.creator.color}>{message?.creator.fullName}</StyledText>
            </View>
        ),
        iconMessageCheck: <></>,
    };

    if (message?.creator.id === user.accountId) {
        messagesStyles = {
            messageBackground: colorScheme.defaultColors.selectColor,
            messageUserIcon: <></>,
            messageWidth: 'auto',
            userTitle: <></>,
            iconMessageCheck: !message?.isRead ? (
                <FontAwesomeIcon icon={faCheck} size={14} style={MessageItemViewStyle.iconFirst} />
            ) : (
                <FontAwesomeIcon icon={faCheck} size={14} /*  */ style={MessageItemViewStyle.iconSecond} />
            ),
        };
    }

    function UnreadMessage() {
        const [isUnreadMessage, setIsUnreadMessage] = useState(false);
        const [unreadMessage, setUnreadMessage] = useState(<></>);

        if (message.id === 'msg.1404') {
        }

        useEffect(() => {
            if (!message?.isRead && messages[indexMessage - 1]?.isRead && message?.creator.id !== user.accountId) {
                setUnreadMessage(
                    <View style={[flexBoxRow.SpaceBetweenCenter, { marginTop: margins.deafaultMargins }]}>
                        <View
                            style={{
                                flex: 1,
                                height: 0.5,
                                backgroundColor: colorScheme.defaultColors.defaultBackgroundColor,
                            }}
                        />
                        <View style={{ marginHorizontal: margins.deafaultMargins }}>
                            <StyledSmallText color={colorScheme.defaultColors.defaultBackgroundColor}>
                                Непрочитанные сообщения
                            </StyledSmallText>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                height: 0.5,
                                backgroundColor: colorScheme.defaultColors.defaultBackgroundColor,
                            }}
                        />
                    </View>
                );
                setIsUnreadMessage(true);
            }
        }, [message?.isRead]);

        return unreadMessage;
    }

    function formatDate(date: Date) {
        return moment(date).format('DD MMMM [в] HH:mm').toString();
    }

    function refComponent() {
        const reply = message?.references.find((ref) => {
            return ref.type === ReferenceType.Reply;
        });
        if (reply != undefined) {
            return (
                <View style={MessageItemViewStyle.body}>
                    <Divider style={MessageItemViewStyle.divider} />
                    <View>
                        <StyledText color={colorScheme.defaultColors.secColor}>
                            {reply?.referencedMessage!.creator.id}
                        </StyledText>
                        <StyledText color={colorScheme.defaultColors.secColor}>
                            {reply?.referencedMessage!.title}
                        </StyledText>
                    </View>
                </View>
            );
        } else return <View />;
    }

    const indexMessage = messages.indexOf(message);

    return (
        <>
            <UnreadMessage />
            <Container>
                <View
                    style={{
                        alignSelf: user.accountId !== message?.creator.id ? 'flex-start' : 'flex-end',
                    }}
                >
                    <View style={MessageItemViewStyle.messageBox}>
                        <View style={[flexBoxRow.default, { width: messagesStyles.messageWidth, zIndex: 10 }]}>
                            {messagesStyles.messageUserIcon}
                            <View style={{ marginLeft: margins.exSmallMargin }}>
                                {messagesStyles.userTitle}
                                <View
                                    style={{
                                        display: 'flex',
                                        alignItems: user.accountId !== message?.creator.id ? 'flex-start' : 'flex-end',
                                    }}
                                >
                                    <PressableButton
                                        backgroundColor={messagesStyles.messageBackground}
                                        isArchived={message?.isArchived}
                                        onPress={(e) => {
                                            let contextMenuX = e.nativeEvent.pageX - contextMenuWidth;
                                            if (e.nativeEvent.pageX <= contextMenuWidth + 15) {
                                                contextMenuX = 5;
                                            }
                                            const contextMenuPosition = {
                                                x: contextMenuX,
                                                y: e.nativeEvent.pageY,
                                            };
                                            setContextMenuPosition(contextMenuPosition);
                                            setIsContextMenuOpen(true);
                                            setActiveMessage(message);
                                        }}
                                        borderTopLeftRadius={messageBorders.borderTopLeftRadius}
                                        borderBottomRightRadius={messageBorders.borderBottomRightRadius}
                                    >
                                        <View style={MessageItemViewStyle.body}>
                                            <View style={MessageItemViewStyle.bodyWrapper}>
                                                {message?.title ? (
                                                    <View style={MessageItemViewStyle.message}>
                                                        <StyledText color={colorScheme.defaultColors.secColor}>
                                                            {message?.title}
                                                        </StyledText>
                                                    </View>
                                                ) : (
                                                    <></>
                                                )}
                                                {refComponent()}
                                                {message?.references != undefined ? (
                                                    // <View style={flexBoxRow.default}>
                                                    message?.references.map((ref) => {
                                                        if (ref.type === ReferenceType.Attachment) {
                                                            return (
                                                                <View>
                                                                    <AttacmentItem attachment={ref} />
                                                                </View>
                                                            );
                                                        }
                                                    })
                                                ) : (
                                                    <View />
                                                )}
                                            </View>
                                        </View>
                                    </PressableButton>
                                </View>
                                <View style={flexBoxRow.FlexEndCenter}>
                                    <View>
                                        <StyledSmallText color={colorScheme.conversationsColors.dateColor}>
                                            {formatDate(message.creationDate)}
                                        </StyledSmallText>
                                    </View>

                                    <View>
                                        {message.isEdited != true ? (
                                            <View />
                                        ) : (
                                            <StyledText color={colorScheme.defaultColors.secColor}>
                                                Исправлено
                                            </StyledText>
                                        )}
                                        {messagesStyles.iconMessageCheck}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Container>
        </>
    );
};

export default MessageItemView;
