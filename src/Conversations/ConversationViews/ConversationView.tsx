import { faCogs, faPaperPlane, faFileWord, faReply, faEdit, faArchive } from '@fortawesome/pro-light-svg-icons';
// import { faPaperPla } from "@fortawesome/pro-solid-svg-icons";
import { useNavigation } from '@react-navigation/core';
import { KeyboardAvoidingView, Modal } from 'native-base';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, FlatList, Keyboard, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, useWindowDimensions, View, VirtualizedList } from 'react-native';
import { MessageStatus } from '../../AppState/MessagingHubState/Enums/MessageStatus';
import { ParticipantType } from '../../AppState/MessagingHubState/Enums/ParticipantType';
import { ReferenceType } from '../../AppState/MessagingHubState/Enums/ReferenceType';
import { addMessageDraftReferences, deleteAttachmentFromReferences, setDraftMessage, updateMessageDraftTitle } from '../../AppState/MessagingHubState/MessagingHubSlice';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import ContextMenu from '../../Components/ContexMenu/ContexMenu';
import { IStyledTextAreaProps, StyledFormInput, StyledTextArea } from '../../Components/Form/Form';
import { StyledFontAwasomeIcon } from '../../Components/Icons/Icons';
import { AttachFilePreview } from '../../Components/InputFields/Document/AttachFilePreview';
import { AttachmentButton } from '../../Components/InputFields/Document/AttachmentButton';
import ConversationAttachmentController from '../../Components/InputFields/Document/ConversationAttachmentController';
import { StyledText } from '../../Components/Typography/StyledTypography';
import { useKeyboard } from '../../globalHooks/Keyboard/useKeyBoard';
import { Container, WithTopBigMg } from '../../globalStyles';
import { colorScheme, margins, paddings, sizesScheme } from '../../globalStyles/constants';
import { flexBoxColumn, flexBoxRow } from '../../globalStyles/flexBox';
import { RequestModule } from '../../RequestModule/RequestModule';
import AttacmentItem from './AttacmentItem';
import { ConversationBottom, ConversationScreen, ConversationTop, ConversationTopWrapper, ConversationViewStyle, PressableSettingButton } from './ConversationViewsStyles/conversationViewStyle';
import { PagingConfigurationBase } from '../Interfaces/PagingConfigurationBase';
import MessageItemView from './MessageItemView';
import ParticipantItem from './ParticipantItem';
import { DraftMessage } from '../../AppState/MessagingHubState/Interfaces/MessageDetails';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import type { IViewableItemsChangedParams } from '../../SharedTypes/ViewPort/IViewableItemsChangedParams';
import type { IConversationViewProps } from '../Interfaces/IConversationViewProps';
import type { IReference } from '../../AppState/MessagingHubState/Interfaces/IReferenceDetails';
import type { MessageDetails } from '../../AppState/MessagingHubState/Interfaces/MessageDetails';
import type { IParticipantDetails } from '../../AppState/MessagingHubState/Interfaces/IParticipantDetails';
import LoadingPlaceholder from '../../Components/LoadindPlaceholder/LoadingPlaceholder';

const ConversationView: FC<IConversationViewProps> = ({ dataAccessLayer }): JSX.Element => {
    //#region Computed values, variables, hooks
    const DAL = dataAccessLayer;
    const filePicker = new ConversationAttachmentController();
    const chatPagingConfig = PagingConfigurationBase;
    const { conversations, draftMessage, objectId, status } = useReduxSelector((state) => state.MessagingHub);
    const { currentUserData } = useReduxSelector((state) => state.Authentication);
    const isHideArchiveMessages = useReduxSelector((state) => state.MainScreen).templateOptions?.conversationDisplayConfig.hideArchivedMessages;
    const textInputRef = useRef(null);
    const chatRef = useRef(null);
    const navigation = useNavigation();
    const [changeText, setChangeText] = useState<string>('');
    const [editingProc, setEditingProc] = useState<boolean>(false);
    const [editingMessage, setEditingMessage] = useState<MessageDetails | undefined>();
    const [replyProc, setReplyProc] = useState<boolean>(false);
    const [replyModel, setReplyModel] = useState<MessageDetails>();
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuWidth, setContextMenuWidth] = useState(0);
    const [activeMessage, setActiveMessage] = useState<null | MessageDetails>(null);
    const [isEndReached, setIsEndReached] = useState(false);
    const [conversationHeight, setConversationHeight] = useState(0);

    const dispatch = useReduxDispatch();
    const isKeyboard = useKeyboard();
    const viewabilityConfig = {
        itemVisiblePercentThreshold: 75,
    };
    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

    const { height, width } = useWindowDimensions();
    const [maxTextAreaHeight, setMaxTextAreaHeight] = useState(0);
    const [references, setReferences] = useState<IReference[]>([]);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
            const maxTextInputMaxHeight = (height - e.endCoordinates.height) / 2;
            setMaxTextAreaHeight(maxTextInputMaxHeight);
        });
        return () => {
            showSubscription.remove();
        };
    }, []);

    const conversationId = useMemo(() => {
        const id = getConversationId(objectId);
        return id;
    }, [objectId, status]);

    useEffect(() => {
        if (conversationId) {
            DAL.getConversationDetails(conversationId);
        }
    }, [conversationId, status]);

    const conversation = useMemo(() => {
        const conv = conversations.find((conv) => {
            return conv.id === conversationId;
        });
        return conv;
    }, [conversations]);

    useEffect(() => {
        getDraftMessage();
    }, [conversation]);

    //#endregion

    //#region Hardware back button behavior
    const backButtonAction = () => {
        navigation.goBack();
        return true;
    };

    BackHandler.addEventListener('hardwareBackPress', () => backButtonAction());
    //#endregion

    //#region TextInput handlers

    function textChangeHandler(text: string) {
        setChangeText(text);
        if (draftMessage != undefined) {
            dispatch(updateMessageDraftTitle(text));
        }
    }

    function textInputValue() {
        if (draftMessage != undefined && replyProc === false && editingProc === false) {
            return draftMessage.title;
        } else {
            return changeText;
        }
    }

    function renderMessageItem(message: MessageDetails) {
        return <MessageItemView editMessage={() => beginMessageEditing(message)} archiveMessage={() => archiveMessage(message.id)} replyMessage={() => replyMessage(message)} setContextMenuPosition={setContextMenuPosition} setIsContextMenuOpen={setIsOpen} setActiveMessage={setActiveMessage} contextMenuWidth={contextMenuWidth} key={message.id} message={message} messages={messagesArr} user={currentUserData!} />;
    }

    const messagesArr = React.useMemo(() => {
        const messages = conversation?.messages;
        if (messages) {
            const arr = messages.filter((mess) => mess.isDraft == false);
            return arr;
        } else {
            return [];
        }
    }, [conversation]);

    //#endregion

    //#region Render and layout functions

    const WithKeyBoardAvoiding: FC = ({ children }) => {
        let conversationContent = children;

        if (Platform.OS === 'ios') {
            conversationContent = <KeyboardAvoidingView behavior={'padding'}>{children}</KeyboardAvoidingView>;
        }

        return <View>{conversationContent}</View>;
    };

    function conversationView(): JSX.Element {
        return (
            <>
                <KeyboardAvoidingView enabled height={'auto'} style={{ justifyContent: 'flex-end', flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? margins.largeMargin + 50 : 0}>
                    <ContextMenu contextMenuPosition={contextMenuPosition} closeContextMenu={() => setIsOpen(false)} isOpen={isOpen} setContextMenuWidth={setContextMenuWidth}>
                        <Pressable
                            style={[flexBoxRow.default, { marginTop: margins.smallMargin }]}
                            onPress={() => {
                                activeMessage && beginMessageEditing(activeMessage);
                                setIsOpen(false);
                            }}
                        >
                            <StyledFontAwasomeIcon color={colorScheme.defaultColors.secColor} icon={faEdit} />
                            <View style={{ marginLeft: margins.smallMargin }}>
                                <StyledText color={colorScheme.defaultColors.secColor}>edit</StyledText>
                            </View>
                        </Pressable>
                        <Pressable
                            style={[flexBoxRow.default, { marginTop: margins.smallMargin }]}
                            onPress={() => {
                                activeMessage && archiveMessage(activeMessage.id);
                                setIsOpen(false);
                            }}
                        >
                            <StyledFontAwasomeIcon color={colorScheme.defaultColors.secColor} icon={faArchive} />
                            <View style={{ marginLeft: margins.smallMargin }}>
                                <StyledText color={colorScheme.defaultColors.secColor}>archive</StyledText>
                            </View>
                        </Pressable>
                        <Pressable
                            style={[flexBoxRow.default, { marginTop: margins.smallMargin }]}
                            onPress={() => {
                                activeMessage && replyMessage(activeMessage);
                                setIsOpen(false);
                            }}
                        >
                            <StyledFontAwasomeIcon color={colorScheme.defaultColors.secColor} icon={faReply} />
                            <View style={{ marginLeft: margins.smallMargin }}>
                                <StyledText color={colorScheme.defaultColors.secColor}>reply</StyledText>
                            </View>
                        </Pressable>
                    </ContextMenu>
                    <View style={{ height: height - 190, flexDirection: 'column-reverse', marginBottom: margins.largeMargin }}>
                        {messagesArr != [] && (
                            <FlatList<MessageDetails>
                                ref={chatRef}
                                keyboardDismissMode={'interactive'}
                                data={messagesArr}
                                extraData={messagesArr}
                                contentContainerStyle={{}}
                                style={{ flexGrow: 0 }}
                                renderItem={(message) => renderMessageItem(message.item)}
                                keyExtractor={(message) => message.id}
                                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                                onContentSizeChange={() => {
                                    if (!isEndReached) {
                                        chatRef!.current!.scrollToEnd({ animated: false });
                                    }
                                }}
                                onEndReached={() => {
                                    setIsEndReached(true);
                                }}
                                onEndReachedThreshold={0}
                            />
                        )}
                    </View>
                    <ConversationBottom isKeyboard={isKeyboard}>
                        <Container>
                            {editAndReplyDetalis()}
                            {renderAttachFilePreview()}
                            <View style={[flexBoxRow.SpaceBetweenEnd, { paddingVertical: paddings.smallPadding }]}>
                                <View
                                    style={[
                                        flexBoxColumn.CenterCenter,
                                        {
                                            height: sizesScheme.InputBtn.default.height,
                                            marginRight: margins.deafaultMargins,
                                        },
                                    ]}
                                >
                                    {attachmentButton()}
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    <StyledTextArea
                                        placeholder="Сообщение"
                                        ref={textInputRef}
                                        // borderWidth={1}

                                        // borderColor={colorScheme.formColors.mainColor}
                                        maxTextAreaHeight={maxTextAreaHeight}
                                        value={textInputValue()}
                                        onChangeText={(text) => textChangeHandler(text)}
                                        onBlur={() => updateMessageDraft()}
                                    />
                                </View>
                                <View
                                    style={[
                                        flexBoxColumn.CenterCenter,
                                        {
                                            height: sizesScheme.InputBtn.default.height,
                                            marginLeft: margins.deafaultMargins,
                                        },
                                    ]}
                                >
                                    {sendButton()}
                                </View>
                            </View>
                        </Container>
                    </ConversationBottom>
                </KeyboardAvoidingView>
            </>
        );
    }

    function renderAttachFilePreview() {
        if (draftMessage?.references.length) {
            return (
                <ScrollView>
                    {draftMessage?.references.map((item) => {
                        return (
                            <AttachFilePreview
                                filename={item.title!}
                                deliteFile={async () => {
                                    const response = await RequestModule.send('/mobile/Attachment/Remove/' + item.id, 'DELETE'); //TODO попробовать удалить и посмотреть, что будет
                                    if (response) {
                                        dispatch(deleteAttachmentFromReferences(item.id!));
                                        updateMessageDraft();
                                    }
                                }}
                                key={item.id}
                            />
                        );
                    })}
                </ScrollView>
            );
        } else {
            return (
                <ScrollView>
                    {references.map((item) => {
                        return (
                            <AttachFilePreview
                                filename={item.title!}
                                deliteFile={async () => {
                                    const response = await RequestModule.send('/mobile/Attachment/Remove/' + item.id, 'DELETE'); //TODO попробовать удалить и посмотреть, что будет
                                    if (response) {
                                        dispatch(deleteAttachmentFromReferences(item.id!));
                                        updateMessageDraft();
                                    }
                                }}
                                key={item.id}
                            />
                        );
                    })}
                </ScrollView>
            );
        }
    }

    function onViewableItemsChanged({ viewableItems, changed }: IViewableItemsChangedParams<MessageDetails>): void {
        viewableItems.forEach((item) => {
            if (item.item.creator.id != currentUserData?.accountId && item.item.isRead == false && item.isViewable == true) {
                DAL.changeMessageStatus([item.item.id], MessageStatus.Read);
            }
        });
    }

    function editAndReplyDetalis(): JSX.Element {
        if (editingMessage != undefined) {
            return (
                <View>
                    <Text>{editingMessage.title}</Text>
                </View>
            );
        } else if (replyModel != undefined) {
            return (
                <View>
                    <Text>{replyModel.title}</Text>
                </View>
            );
        } else return <View />;
    }

    function settingsView(): JSX.Element {
        const conversation = conversations.find((conv) => {
            return conv.id === conversationId;
        });
        const participants = conversation?.participants;
        const attachments = conversation?.attachments;

        return (
            <ScrollView>
                <Container>
                    <StyledText color={colorScheme.defaultColors.secColor}>Participants</StyledText>
                    {participants != undefined ? participants?.map((item) => <ParticipantItem participant={item} key={item.id} />) : <View />}

                    <WithTopBigMg>
                        <StyledText color={colorScheme.defaultColors.secColor}>Attachments</StyledText>
                        {attachments != undefined ? attachments?.map((item) => <AttacmentItem attachment={item} key={item.id} />) : <View />}
                    </WithTopBigMg>
                </Container>
            </ScrollView>
        );
    }

    //#endregion

    //#region Edit, reply, archive functions

    function beginMessageEditing(originMessage: MessageDetails): void {
        setEditingProc(true);
        setChangeText(originMessage.title);
        setEditingMessage(originMessage);
        textInputRef?.current?.focus();
    }

    function editMessage(): void {
        let editedMessage: MessageDetails = Object.assign({}, editingMessage);
        editedMessage.title = textInputValue();
        DAL.editMessage(editedMessage);
    }

    function archiveMessage(messageId: string): void {
        DAL.changeMessageStatus([messageId], MessageStatus.Archived);
    }

    function replyMessage(replyMess: MessageDetails): void {
        setReplyProc(true);
        setReplyModel(replyMess);
        const ref: IReference = {
            type: ReferenceType.Reply,
            referencedMessage: { id: replyMess.id },
        };
        dispatch(addMessageDraftReferences(ref));
    }

    //#endregion

    //#region TextInput button handlers and views

    function firstMessageCreation() {
        const attachments = references;
        const creator: Partial<IParticipantDetails> = { id: currentUserData?.accountId, type: ParticipantType.User };
        const messageTitle = changeText;
        const draft = new DraftMessage(creator, messageTitle, attachments);
        const newMessage = {
            message: draft,
            objId: objectId,
        };
        //@ts-ignore
        DAL.createFirstMessage(newMessage);
        setChangeText('');
        setReferences([]);
    }

    function sendNewMessage() {
        if (!draftMessage) {
            firstMessageCreation();
        } else if (draftMessage?.title?.length != 0 || draftMessage.references.length > 0) {
            DAL.sendMessage(draftMessage!);
            setChangeText('');
            dispatch(updateMessageDraftTitle(''));
            if (replyProc) {
                setReplyProc(false);
            }
            setTimeout(() => chatRef!.current!.scrollToEnd(), 900);
        } else return;
    }

    function sendButtonPressEvent() {
        if (editingProc == true) {
            editMessage();
            setChangeText('');
            dispatch(updateMessageDraftTitle(''));
            setEditingMessage(undefined);
            setEditingProc(false);
        } else if (changeText.trim() !== '' || references.length > 0 || draftMessage?.references?.length! > 0) {
            conversationId ? sendNewMessage() : firstMessageCreation();
        }
        setReplyModel(undefined);
    }

    function sendButton() {
        let sendBtnColor = colorScheme.defaultColors.secColor;

        if (changeText.trim() !== '' || references.length > 0 || draftMessage?.references?.length! > 0) {
            sendBtnColor = colorScheme.defaultColors.defaultBackgroundColor;
        }
        return (
            <Pressable onPress={() => sendButtonPressEvent()}>
                <StyledFontAwasomeIcon icon={faPaperPlane} color={sendBtnColor} />
            </Pressable>
        );
    }

    function attachmentButton() {
        return (
            <AttachmentButton
                pickDocument={async () => {
                    const upload = await filePicker.uploadDocument();
                    if (conversationId) {
                        addAttachmentToDraft(upload);
                        filePicker.clearCurrentReferences();
                    } else if (upload) {
                        setReferences(upload);
                    }
                    return upload;
                }}
                pickMedia={async () => {
                    const upload = await filePicker.uploadMedia();
                    if (conversationId) {
                        addAttachmentToDraft(upload);
                        filePicker.clearCurrentReferences();
                    } else if (upload) {
                        setReferences(upload);
                    }
                    return upload;
                }}
            />
        );
    }

    function addAttachmentToDraft(attachmet: IReference[] | undefined) {
        if (conversationId && draftMessage) {
            const cloneDraft = JSON.parse(JSON.stringify(draftMessage)) as MessageDetails;
            if (attachmet) {
                attachmet?.forEach((item) => cloneDraft.references.push(item));
                DAL.updateDraft(cloneDraft!);
            }
        }
    }

    function updateMessageDraft() {
        DAL.updateDraft(draftMessage!);
    }

    //#endregion

    //#region Service functions

    function getInitialScrollIndex(messagesArr: MessageDetails[]) {
        const index = messagesArr.findIndex((mess) => mess.creator.id != currentUserData?.accountId && mess.isRead == false);
        return index;
    }

    function getDraftMessage(): void {
        const newDraft = conversation?.messages?.find((message) => {
            return message.isDraft;
        });
        if (newDraft != undefined) {
            dispatch(setDraftMessage(newDraft!));
        } else dispatch(setDraftMessage(undefined));
    }

    function getConversationId(objId: string): string | undefined {
        const conversation = conversations.find((conv) => {
            if (conv.linkedParticipant != undefined) {
                if (conv.linkedParticipant.id === objId) {
                    return true;
                } else return false;
            } else return false;
        });
        if (conversation != undefined) {
            return conversation.id;
        } else return undefined;
    }

    function goToSettingsPressEvent(): void {
        // DAL.getConversationDetails(conversationId)
        setShowSettings(!showSettings);
    }

    //#endregion

    //#region Conversation view
    return (
        <SafeAreaView>
            <ConversationScreen>
                <PressableSettingButton onPress={() => goToSettingsPressEvent()}>
                    <StyledFontAwasomeIcon icon={faCogs} color={colorScheme.defaultColors.mainColor} />
                </PressableSettingButton>
                {showSettings == true ? settingsView() : conversationView()}
            </ConversationScreen>
        </SafeAreaView>
    );
    //#endregion
};

export default ConversationView;
