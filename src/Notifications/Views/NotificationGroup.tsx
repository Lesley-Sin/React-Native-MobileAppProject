import React, { FC, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { NotificationIndicator } from '../../Components/Badge/Badge';
import Searcher from '../../Components/Searcher/Searcher';
import { Tabs } from '../../Components/Tabs/Tabs';
import { StyledText } from '../../Components/Typography/StyledTypography';
import { Container, WithTopDefMg, WithTopExtraMg } from '../../globalStyles';
import { colorScheme, fontScheme, margins } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';
import { INotificationGroupProps, INotificatonGroupData } from '../Interfaces/INotificationGroupProps';
import { notificationTypes } from '../meta';
import { NotificationItem } from './NotificateItem';

export const NotificationGroup: FC<INotificationGroupProps> = ({ clearField, searchFilter, messages, dataAccessLayer, changeText }): JSX.Element => {
    const [activeNotificationIndex, setActiveNotificationIndex] = useState<number>(0);

    if (!messages) return <View />;
    const notificationGroupItem = {
        data: [],
        title: '',
        indicator: <></>,
    };
    const notificationGroup: [INotificatonGroupData, INotificatonGroupData] = [{ ...notificationGroupItem }, { ...notificationGroupItem }];

    const getColor = (index: number) => {
        if (index === activeNotificationIndex) {
            return colorScheme.defaultColors.mainColor;
        }
        return colorScheme.defaultColors.secColor;
    };

    const getBackgroundColor = (index: number) => {
        if (index === activeNotificationIndex) {
            return colorScheme.notificationColors.error;
        }
        return colorScheme.defaultColors.mainColor;
    };

    messages.map((message) => {
        if (message.type === notificationTypes.conversation) {
            notificationGroup[0].data = [...notificationGroup[0].data, message];
            !notificationGroup[0].title && (notificationGroup[0].title = 'обсуждения');
        } else {
            notificationGroup[1].data = [...notificationGroup[1].data, message];
            !notificationGroup[1].title && (notificationGroup[1].title = 'действия');
        }
    });

    let notificationGroupTitles: string[] = [];
    let notificationGroupIndicatores: JSX.Element[] = [];
    const notificationFilteredGroup = notificationGroup.filter((notificationItem, i) => {
        if (notificationItem.title.length) {
            notificationGroupTitles.push(notificationItem.title);
        }
        return notificationItem.title.length;
    });

    notificationGroupTitles.map((_, i) => notificationGroupIndicatores.push(<NotificationIndicator backgroundColor={getBackgroundColor(i)} color={getColor(i)} fontSize={fontScheme.smallText.size} customStyles={{ marginLeft: margins.smallMargin }} amount={notificationFilteredGroup[i].data.length} />));

    useEffect(() => {
        setActiveNotificationIndex(notificationFilteredGroup.length - 1);
    }, [notificationFilteredGroup.length]);

    useEffect(() => {
        setActiveNotificationIndex(0);
    }, []);

    return (
        <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: colorScheme.defaultColors.mainColor }}>
            <View style={{ backgroundColor: colorScheme.defaultColors.defaultBackgroundColor }}>
                <Container>
                    <WithTopDefMg>
                        <Searcher clearField={clearField} customValue={searchFilter} onChangeText={changeText} />
                    </WithTopDefMg>
                </Container>
                <WithTopDefMg>
                    {messages.length > 0 && (
                        <Tabs
                            tabsItems={notificationGroupTitles}
                            tabIndicator={notificationGroupIndicatores}
                            activeIndex={activeNotificationIndex}
                            pressed={(_, i) => {
                                setActiveNotificationIndex(i);
                            }}
                        />
                    )}
                </WithTopDefMg>
            </View>
            {messages.length === 0 && (
                <WithTopExtraMg style={flexBoxRow.CenterCenter}>
                    <StyledText color={colorScheme.defaultColors.greyoutColor}>Нет новых уведомлений</StyledText>
                </WithTopExtraMg>
            )}
            {notificationFilteredGroup[activeNotificationIndex]?.data && [...notificationFilteredGroup[activeNotificationIndex].data].reverse().map((item) => <NotificationItem message={item} dataAccessLayer={dataAccessLayer} key={item.id} />)}
        </ScrollView>
        // </View>
    );
};
