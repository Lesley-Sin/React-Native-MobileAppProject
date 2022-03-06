import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { TargetProperties } from '../../AppState/ProfileState/Enums/TargetProperies';
import { IPropertyChange } from '../../AppState/ProfileState/Interfaces/IPropertyChange';
import { changeTargetProp } from '../../AppState/ProfileState/ProfileSlice';
import store, { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { ScrollNavigation } from '../../Components/ScrollNavigation/ScrollNavigation';
import { StyledSecodaryTitle, StyledText } from '../../Components/Typography/StyledTypography';
import { UserPic } from '../../Components/UserPic/UserPic';
import { Container, WithBottomBigMg, WithTopDefMg, WithTopSmallMg } from '../../globalStyles';
import { colorScheme } from '../../globalStyles/constants';
import { ICollectionElement } from '../Interfaces/ICollectionElement';
import { IMyProfileScreenProps } from '../Interfaces/IMyProfileScreenProps';

const MyProfileScreen: FC<IMyProfileScreenProps> = ({ dataAccessLayer }) => {
    //#region Variables, collections, hooks
    const DAL = dataAccessLayer;
    const [actualPass, setActualPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [error, setError] = useState<string>('');

    const dispatch = useReduxDispatch();

    const { model, supervisorsList } = useReduxSelector((state) => state.Profile);

    const authenticationTypes = {
        BUILTIN: 'Builtin',
        LDAP: 'Ldap',
        FEDERATION: 'Federation',
    };

    const languageTypes = {
        RU: 'ru',
        EN: 'en',
        DE: 'de',
    };

    const authenticationCollection: Array<ICollectionElement> = [
        {
            id: authenticationTypes.BUILTIN,
            name: authenticationTypes.BUILTIN,
        },
        {
            id: authenticationTypes.LDAP,
            name: authenticationTypes.LDAP,
        },
        {
            id: authenticationTypes.FEDERATION,
            name: authenticationTypes.FEDERATION,
        },
    ];

    const languagesCollection: Array<ICollectionElement> = [
        {
            id: languageTypes.RU,
            name: languageTypes.RU,
        },
        {
            id: languageTypes.EN,
            name: languageTypes.EN,
        },
        {
            id: languageTypes.DE,
            name: languageTypes.DE,
        },
    ];
    //#endregion

    //#region Data fetchign functions
    async function getProfileData(): Promise<void> {
        await DAL.getProfileInfo();
    }

    async function editProfileChanges(): Promise<void> {
        const obj = store.getState().Profile.model;
        await DAL.editAccountInfo(obj!);
        await getProfileData();
    }

    //#endregion

    //#region handlers
    function textInputHandler(text: string, target: TargetProperties): void {
        const obj: IPropertyChange = {
            target: target,
            value: text,
        };
        dispatch(changeTargetProp(obj));
    }

    function pickerHandler(value: string, target: TargetProperties): void {
        const obj: IPropertyChange = {
            target: target,
            value: value,
        };
        dispatch(changeTargetProp(obj));
    }

    function checkboxHandler(value: boolean, target: TargetProperties): void {
        const obj: IPropertyChange = {
            target: target,
            value: value,
        };
        dispatch(changeTargetProp(obj));
    }

    //#endregion

    const profileScreenList = ['Контактная информация', 'Сведения о работе', 'еще Сведения о работе', 'другая Контактная информация'];

    let ProfileArr;

    const secColor = colorScheme.defaultColors.secColor;

    if (model) {
        ProfileArr = [
            <>
                <StyledSecodaryTitle color={secColor}>Контактная информация</StyledSecodaryTitle>
                <Container>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Ф.И.О</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.fullName}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Адрес эл. почты</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.mbox}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Skype</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.skype}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Имя пользователя</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.username}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Телефон</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.phone}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                </Container>
            </>,
            <>
                <StyledSecodaryTitle color={secColor}>Сведения о работе</StyledSecodaryTitle>
                <Container>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Должность</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.username}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Офис</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.office}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Руководитель</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.manager}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Отдел</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.department}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                </Container>
            </>,
            <>
                <StyledSecodaryTitle color={secColor}>еще Сведения о работе</StyledSecodaryTitle>
                <Container>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Должность</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.username}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Офис</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.office}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Руководитель</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.manager}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Отдел</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.department}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                </Container>
            </>,
            <>
                <StyledSecodaryTitle color={secColor}>другая Контактная информация</StyledSecodaryTitle>
                <Container>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Должность</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.username}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Офис</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.office}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Руководитель</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.manager}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                    <WithTopDefMg>
                        <StyledText color={secColor}>Отдел</StyledText>
                        <WithTopSmallMg>
                            <StyledText color={secColor}>{model.department}</StyledText>
                        </WithTopSmallMg>
                    </WithTopDefMg>
                </Container>
            </>,
        ];
        let headerItem = (
            <View style={{ backgroundColor: colorScheme.defaultColors.defaultBackgroundColor }}>
                <WithTopDefMg>
                    <UserPic border={false} abreviation={model?.username}>
                        <UserPic.Name>{model?.username}</UserPic.Name>
                    </UserPic>
                </WithTopDefMg>
                <WithBottomBigMg />
            </View>
        );

        return <ScrollNavigation tabsItems={profileScreenList} scrollItems={ProfileArr} headerItem={headerItem} />;
    }
    //#region Profile view
    return <></>;
    //#endregion
};

export default MyProfileScreen;
