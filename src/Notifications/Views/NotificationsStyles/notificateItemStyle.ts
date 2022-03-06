import { StyleSheet } from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import { colorScheme, margins } from '../../../globalStyles/constants';

interface INotificationItemRight {
    marginLeft?: number;
}

export const NotificateItemStyle = (pressable?: boolean) =>
    StyleSheet.create({
        boxView: {
            alignItems: 'center',
        },

        view: {
            flexDirection: 'row',
        },

        text: {
            textAlign: 'center',
            backgroundColor: pressable ? 'dodgerblue' : 'transparent',
        },
    });

export const NotificationItemBody = styled.View`
    background-color: ${(props: { isRead: boolean }) => (props.isRead ? 'white' : '#e8f6ff')};
`;

export const NotificationItemInfo = styled.View`
    padding-bottom: ${margins.smallMargin}px;
    padding-top: ${margins.deafaultMargins}px;
`;

export const NotificationItemRight = styled.View<INotificationItemRight>`
    margin-left: ${({ marginLeft = margins.smallMargin }) => marginLeft >= 0 && marginLeft}px;
    flex: 1;
`;
export const NotificationItemDate = styled.View`
    align-self: flex-end;
`;
