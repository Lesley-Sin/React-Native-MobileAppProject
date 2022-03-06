import React, { useState } from 'react';
import { ConversationType } from '../../AppState/MessagingHubState/Enums/ConversationType';
import { ConversationDetails } from '../../AppState/MessagingHubState/Interfaces/IConversationDetails';
import { useReduxSelector } from '../../AppState/Store';
import { useSearcher } from '../../globalHooks/Searccher/useSearcher';
import { INotificationViewProps } from '../Interfaces/INotificationViewProps';
import { NotificationGroup } from './NotificationGroup';

export function NotificationView({ dataAccessLayer }: INotificationViewProps): JSX.Element {
    const conversations = useReduxSelector((state) => state.MessagingHub.conversations);
    let unreadMessagesCount: number = 0;

    const { setField, clearField, value } = useSearcher();

    const isStringValid = (str: string, filter: string) => str?.toLowerCase().includes(filter);

    function search(conversation: ConversationDetails[], filter: string) {
        let lowerCaseFilter = filter.toLowerCase();
        let sysNotif = conversation.filter((item) => item.type == ConversationType.System);
        let messages = sysNotif?.map((item) => item.messages).reduce((acc, val) => acc.concat(val), []);
        let searchMess = messages?.filter((item) => {
            return (isStringValid(item?.title, lowerCaseFilter) || isStringValid(item?.parent?.title, lowerCaseFilter) || isStringValid(item?.references[0]?.title, lowerCaseFilter) || isStringValid(item?.references[0]?.referencedMessage?.title, lowerCaseFilter)) && !item.isArchived;
        });
        return searchMess;
    }

    return (
        <>
            {conversations.map((item) => {
                if (item.type == ConversationType.System) {
                    unreadMessagesCount = item.unreadMessagesCount;

                    return <NotificationGroup clearField={clearField} searchFilter={value} messages={search(conversations, value)} changeText={setField} dataAccessLayer={dataAccessLayer} key={item.id} />;
                }
            })}
        </>
    );
}
