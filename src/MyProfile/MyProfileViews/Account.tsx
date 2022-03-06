import { faBell, faBookOpen, faChevronRight, faCommentAltDots, faEnvelope, faPhoneAlt, faShield, faShieldCheck, faSignOut, faUserCircle, IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { GestureResponderEvent, Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import { IModulesMediator } from '../../AppMediator/Interfaces/IModulesMediator';
import { setLoggedIn } from '../../AppState/AuthenticationState/AuthenticationSlice';
import { AuthState } from '../../AppState/AuthenticationState/Enums/AuthState';
import { toggleRightDrawer } from '../../AppState/DrawerControl/DrawerControlSlice';
import { resetPassedObject } from '../../AppState/MainScreenState/MainScreenSlice';
import { resetMessagingHubState } from '../../AppState/MessagingHubState/MessagingHubSlice';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { DefaultCard } from '../../Components/Boxes/Boxes';
import { StyledFontAwasomeIcon } from '../../Components/Icons/Icons';
import { StyledSmallText, StyledText } from '../../Components/Typography/StyledTypography';
import { UserPic } from '../../Components/UserPic/UserPic';
import { Container, Separator, WithBottomExtraMg, WithBottomMg, WithTopBigMg, WithTopDefMg, WithTopExtraMg, WithTopSmallMg } from '../../globalStyles';
import { colorScheme, fontScheme, margins } from '../../globalStyles/constants';
import { flexBoxColumn, flexBoxRow } from '../../globalStyles/flexBox';
import { IMyProfileDAL } from '../Interfaces/IMyProfileDAL';

export interface IAccount {
    mediator: IModulesMediator;
    myProfileDAL: IMyProfileDAL;
}

interface IAccountItem {
    icon: IconDefinition;
    title: string;
    isSeparator?: boolean;
    isChevron?: boolean;
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
    color?: string;
}

function AccountItem({ icon, title, isSeparator = true, onPress, isChevron = true, color }: IAccountItem) {
    return (
        <Pressable onPress={onPress && onPress}>
            <View style={flexBoxRow.SpaceBetweenStart}>
                <View style={flexBoxRow.CenterCenter}>
                    <StyledFontAwasomeIcon color={color ? color : colorScheme.defaultColors.secColor} icon={icon} />
                    <View style={{ marginLeft: margins.smallMargin, marginTop: 3 }}>
                        <StyledText color={color ? color : colorScheme.defaultColors.secColor}>{title}</StyledText>
                    </View>
                </View>
                {isChevron && (
                    <View style={{ marginRight: margins.smallMargin }}>
                        <StyledFontAwasomeIcon color={colorScheme.defaultColors.greyoutColor} icon={faChevronRight} />
                    </View>
                )}
            </View>
            {isSeparator && (
                <WithTopDefMg>
                    <Separator marginLeft={0} />
                </WithTopDefMg>
            )}
        </Pressable>
    );
}

function Account({ mediator, myProfileDAL }: IAccount): JSX.Element {
    const { model } = useReduxSelector((state) => state.Profile);
    const dispatch = useReduxDispatch();
    const navigation = useNavigation();

    function userProfileButtonPressEvent(): void {
        navigation.navigate('MyProfileScreen');
    }

    function exitButtonPressEvent(): void {
        dispatch(setLoggedIn(AuthState.logouted));
        dispatch(resetMessagingHubState());
        dispatch(resetPassedObject());
        mediator.closeConnection();

        navigation.navigate('Login');
        dispatch(toggleRightDrawer(false));
    }

    const getUserData = async () => {
        await mediator.getProfileData();
    };

    useEffect(() => {
        getUserData();
    }, []);

    const getUserName = () => (model?.username ? model.username.toUpperCase() : '');

    return (
        <ScrollView>
            <SafeAreaView>
                <WithTopExtraMg>
                    <Container>
                        <WithBottomMg>
                            <UserPic abreviationColor={colorScheme.defaultColors.defaultBackgroundColor} abreviation={getUserName()}>
                                <Pressable onPress={() => userProfileButtonPressEvent()}>
                                    <UserPic.Name color={colorScheme.defaultColors.defaultBackgroundColor}>{getUserName()}</UserPic.Name>
                                </Pressable>

                                <UserPic.Mail fontSize={fontScheme.h2.size} color={colorScheme.defaultColors.greyoutColor}>
                                    {model?.mbox}
                                </UserPic.Mail>
                            </UserPic>
                        </WithBottomMg>
                        <WithTopBigMg>
                            <StyledSmallText color={colorScheme.defaultColors.greyoutColor}>ОСНОВНОЕ</StyledSmallText>
                            <WithTopSmallMg>
                                <DefaultCard height paddingRight={0}>
                                    <AccountItem icon={faBell} title={'Уведомления'} />
                                    <WithTopDefMg>
                                        <AccountItem icon={faShieldCheck} title={'Безопасность'} />
                                    </WithTopDefMg>
                                    <WithTopDefMg>
                                        <AccountItem onPress={() => userProfileButtonPressEvent()} isSeparator={false} icon={faUserCircle} title={'Аккаунт'} />
                                    </WithTopDefMg>
                                </DefaultCard>
                            </WithTopSmallMg>
                        </WithTopBigMg>
                        <WithTopBigMg>
                            <StyledSmallText color={colorScheme.defaultColors.greyoutColor}>ПОДДЕРЖКА</StyledSmallText>
                            <WithTopSmallMg>
                                <DefaultCard height paddingRight={0}>
                                    <AccountItem icon={faBookOpen} title={'Справка'} />
                                    <WithTopDefMg>
                                        <AccountItem icon={faCommentAltDots} title={'Оставить отзыв'} />
                                    </WithTopDefMg>
                                    <WithTopDefMg>
                                        <AccountItem isSeparator={false} icon={faPhoneAlt} title={'Контакты'} />
                                    </WithTopDefMg>
                                </DefaultCard>
                            </WithTopSmallMg>
                        </WithTopBigMg>
                        <WithTopBigMg>
                            <WithTopSmallMg>
                                <DefaultCard height paddingRight={0}>
                                    <AccountItem color={colorScheme.notificationColors.error} isChevron={false} isSeparator={false} onPress={() => exitButtonPressEvent()} icon={faSignOut} title={'Выйти'} />
                                </DefaultCard>
                            </WithTopSmallMg>
                        </WithTopBigMg>
                    </Container>
                </WithTopExtraMg>
                <WithTopBigMg style={flexBoxColumn.CenterCenter}>
                    <StyledSmallText color={colorScheme.defaultColors.greyoutColor}>Версия приложения 3.5.910.0</StyledSmallText>
                </WithTopBigMg>
                <WithBottomExtraMg />
            </SafeAreaView>
        </ScrollView>
    );
}

export default Account;
