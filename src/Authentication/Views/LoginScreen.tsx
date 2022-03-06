import { faEye, faEyeSlash, faPlusCircle, faAngleLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Divider, FormControl, IconButton, KeyboardAvoidingView } from 'native-base';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Platform, Pressable, SafeAreaView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { setDomain, setIsLoading, setLoggedIn, setPassword, setServerAdress, setShowError, setUsername } from '../../AppState/AuthenticationState/AuthenticationSlice';
import { AuthState } from '../../AppState/AuthenticationState/Enums/AuthState';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { AlertError } from '../../Components/Alerts/Alerts';
import AppFooter from '../../Components/AppFooter/AppFooter';
import { DefaultCard, ScrollViewWithoutBounce } from '../../Components/Boxes/Boxes';
import { StretchedButton, SwipableButton } from '../../Components/Buttons/Button';
import { StyledFormControlLabel, StyledFormInput } from '../../Components/Form/Form';
import { StyledFontAwasomeIcon } from '../../Components/Icons/Icons';
import { WithLinearGradient } from '../../Components/LinearGradient/LinearGradient';
import { Logo } from '../../Components/Logo/Logo';
import { StyledSmallText, StyledText } from '../../Components/Typography/StyledTypography';
import ErrorHandler from '../../ErrorHandler/ErrorHandler';
import { useKeyboard } from '../../globalHooks/Keyboard/useKeyBoard';
import { Container, WithTopBigMg, WithTopDefMg, WithTopExtraMg } from '../../globalStyles';
import { colorScheme, margins, paddings, sizesScheme } from '../../globalStyles/constants';
import { flexBoxColumn, flexBoxRow } from '../../globalStyles/flexBox';
import { SecureStore } from '../../SecureStore/SecureStore';
import { SavedCurrentData, SavedData } from '../Data/Data';
import { ILoginScreenProps, ISelectableUserItem } from '../Interfaces/ILoginScreenProps';

export function LoginScreen({ viewModel }: ILoginScreenProps) {
    const ViewModel = viewModel;
    const [errorMessage, setErrorMessage] = useState<string>();
    const [savedUserData, setSavedUserData] = useState<SavedData[]>([]);
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const navigation = useNavigation();
    const isKeyboard = useKeyboard();
    const { width, height } = useWindowDimensions();
    const dispatch = useReduxDispatch();
    const { loggedIn, serverAddress, username, password, showError, isLoading, domain } = useReduxSelector((state) => state.Authentication);

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            showPrefill();
            dispatch(setShowError(false));
            return () => {
                // Do something when the screen is unfocused
                showPrefill();
                dispatch(setShowError(false));
            };
        }, [])
    );

    useEffect(() => {
        async function tryLoginWithExstCreds() {
            ViewModel.setNavigation(navigation);
            showPrefill();
            ViewModel.setNavigation(navigation);
            if (loggedIn === AuthState.undefined) {
                let hasErrorOnLogin = await ViewModel.sendLoginData();
                if (hasErrorOnLogin) {
                    setErrorMessage(hasErrorOnLogin);
                    dispatch(setShowError(true));
                }
            }
        }
        tryLoginWithExstCreds();
    }, []);

    async function showPrefill() {
        let data = await SecureStore.getSavedUsersData();
        setSavedUserData(data);
    }

    const tryLogin = async () => {
        let sendRequest = await ViewModel.validateForm({
            username,
            serverAddress,
            password,
            domain,
        });
        if (sendRequest != undefined) {
            dispatch(setShowError(true));
            setErrorMessage(ViewModel.getErrorMessage());
        } else {
            setErrorMessage(undefined);
        }
    };

    async function goTologinPage() {
        await SecureStore.deleteCurrentUser();
        dispatch(setLoggedIn(AuthState.undefined));
    }

    function LoginPage(): JSX.Element {
        let appFooterUi = <AppFooter />;

        if (isKeyboard && Platform.OS !== 'ios') {
            appFooterUi = <></>;
        }

        return (
            <WithLinearGradient>
                <SafeAreaView>
                    <View style={[flexBoxColumn.spaceBetween, { height: '100%' }]}>
                        {savedUserData.length != 0 && !isKeyboard && (
                            <View>
                                <Pressable
                                    onPress={() => {
                                        dispatch(setLoggedIn(AuthState.logouted));
                                    }}
                                    style={{ width: 40 }}
                                >
                                    <FontAwesomeIcon transform={{ flipY: true }} icon={faAngleLeft} size={40} color="white" />
                                </Pressable>
                            </View>
                        )}
                        <View style={{ flex: 1 }}>
                            <Container paddingTop={savedUserData.length != 0 ? margins.exSmallMargin : margins.extraMargin}>
                                <KeyboardAvoidingView height={/* isKeyboard ? height : */ 'auto'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? sizesScheme.InputBtn.stretch.height : 0}>
                                    <DefaultCard>
                                        <ScrollViewWithoutBounce
                                            contentContainerStyle={{
                                                flexGrow: 1,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Logo />
                                            <WithTopExtraMg>
                                                <FormControl isRequired={true} isInvalid={!serverAddress?.trim()}>
                                                    <StyledFormControlLabel>Адрес сервера</StyledFormControlLabel>
                                                    <StyledFormInput scrollEnabled={false} multiline={false} placeholder={'Имя сервера'} onChangeText={(text) => dispatch(setServerAdress(text))} value={serverAddress} />
                                                </FormControl>
                                                <WithTopDefMg>
                                                    <FormControl isInvalid={false}>
                                                        {/* <StyledLabel>Домен</StyledLabel> */}
                                                        <StyledFormControlLabel>Домен</StyledFormControlLabel>
                                                        <StyledFormInput scrollEnabled={false} multiline={false} onChangeText={(text) => dispatch(setDomain(text))} value={domain} />
                                                    </FormControl>
                                                </WithTopDefMg>
                                                <WithTopDefMg>
                                                    <FormControl isRequired={true} isInvalid={!username?.trim()}>
                                                        <StyledFormControlLabel>Эл. почта или имя пользователя</StyledFormControlLabel>

                                                        <StyledFormInput scrollEnabled={false} multiline={false} onChangeText={(text) => dispatch(setUsername(text))} value={username} placeholder="Username" />
                                                    </FormControl>
                                                </WithTopDefMg>
                                                <WithTopDefMg>
                                                    <FormControl isRequired={true} isInvalid={!password?.trim()}>
                                                        <StyledFormControlLabel>Пароль </StyledFormControlLabel>

                                                        <StyledFormInput scrollEnabled={false} multiline={false} onChangeText={(text) => dispatch(setPassword(text))} InputRightElement={<IconButton icon={<FontAwesomeIcon icon={hidePassword ? faEye : faEyeSlash} />} onPress={() => setHidePassword(!hidePassword)}></IconButton>} secureTextEntry={hidePassword} value={password} placeholder="*******" />
                                                    </FormControl>
                                                </WithTopDefMg>

                                                {showError && <WithTopDefMg>{<AlertError errorList={errorMessage == undefined ? undefined : [errorMessage]} onCloseAlert={() => dispatch(setShowError(false))} closeIcon={true} />}</WithTopDefMg>}
                                            </WithTopExtraMg>
                                            <WithTopDefMg>
                                                <StretchedButton
                                                    onPress={() => {
                                                        tryLogin();
                                                    }}
                                                >
                                                    Войти
                                                </StretchedButton>
                                            </WithTopDefMg>
                                            {/*  <WithTopDefMg>
                                                <StretchedButton
                                                    onPress={() => {
                                                        dispatch(setPassword('C0m1ndw4r3Pl@tf0rm'));
                                                    }}
                                                >
                                                    Fill in password
                                                </StretchedButton>
                                            </WithTopDefMg> */}
                                        </ScrollViewWithoutBounce>
                                    </DefaultCard>
                                </KeyboardAvoidingView>
                            </Container>
                        </View>
                        <View>{appFooterUi}</View>
                    </View>
                </SafeAreaView>
            </WithLinearGradient>
        );
    }

    const SwipabaleComponent: FC<any> = ({ progress, dragX }) => {
        const [buttonWidthEdit, setButtonWidthEdit] = useState(0);
        const [buttonWidthDelete, setButtonWidthDelete] = useState(0);

        const trans = dragX.interpolate({
            inputRange: [-buttonWidthEdit, 0],
            outputRange: [0, buttonWidthEdit],
        });

        const trans2 = dragX.interpolate({
            inputRange: [-buttonWidthEdit - buttonWidthDelete, 0],
            outputRange: [buttonWidthEdit, buttonWidthEdit + buttonWidthDelete],
        });

        return (
            <>
                <RectButton>
                    <Animated.View
                        style={[
                            {
                                transform: [{ translateX: trans }],
                            },
                        ]}
                    >
                        <SwipableButton
                            backgroundColor={colorScheme.buttonColors.cancelBackground}
                            onLayout={({ nativeEvent: { layout } }) => {
                                if (buttonWidthEdit !== layout.width) {
                                    setButtonWidthEdit(layout.width);
                                }
                            }}
                        >
                            Изменить
                        </SwipableButton>
                    </Animated.View>
                </RectButton>
                <RectButton>
                    <Animated.View
                        style={[
                            {
                                transform: [{ translateX: trans2 }],
                            },
                        ]}
                    >
                        <SwipableButton
                            backgroundColor={colorScheme.notificationColors.error}
                            onLayout={({ nativeEvent: { layout } }) => {
                                if (buttonWidthDelete !== layout.width) {
                                    setButtonWidthDelete(layout.width);
                                }
                            }}
                        >
                            Удалить
                        </SwipableButton>
                    </Animated.View>
                </RectButton>
            </>
        );
    };

    const renderLeftActions = (progress: any, dragX: any) => {
        return <SwipabaleComponent progress={progress} dragX={dragX} />;
    };

    function SelectableUserItem({ onPress, userName, domain, serverAdress }: ISelectableUserItem) {
        return (
            <WithTopDefMg>
                <TouchableOpacity onPress={onPress}>
                    <Swipeable renderRightActions={renderLeftActions} friction={2}>
                        <StyledText color={colorScheme.defaultColors.secColor}>{userName}</StyledText>
                        <StyledSmallText color={colorScheme.defaultColors.greyoutColor}>{serverAdress}</StyledSmallText>
                        <View style={{ marginTop: margins.exSmallMargin }}>
                            <Divider />
                        </View>
                    </Swipeable>
                </TouchableOpacity>
            </WithTopDefMg>
        );
    }

    async function selectableUserItemPressEvent(userName: string, serverAddres: string) {
        try {
            dispatch(setIsLoading(true));
            await SecureStore.deleteCurrentUser();
            const savedData = await SecureStore.getSavedUsersData();
            const savedItem = savedData.find((item) => {
                return item.userName === userName && item.serverAddres === serverAddres;
            });
            const data: SavedCurrentData = {
                token: savedItem!.token,
                sessionId: savedItem!.sessionId,
                serverAddress: savedItem!.serverAddres,
                username: savedItem!.userName,
                accountId: savedItem!.accountId,
                protocol: savedItem!.protocol,
                domain: savedItem!.domain,
            };
            await SecureStore.setCurrentUser(data);

            let hasErrorOnLogin = await ViewModel.sendLoginData();
            if (hasErrorOnLogin) {
                await goTologinPage();
                dispatch(setShowError(true));
                setErrorMessage(hasErrorOnLogin);
            } else {
            }

            ViewModel.login();
        } catch (error) {
            dispatch(setIsLoading(false));
            ErrorHandler.handleError(LoginScreen.name, selectableUserItemPressEvent.name, error);
        }
    }

    function PickUserPage() {
        return (
            <WithLoginScreen appFooterUi={<AppFooter />}>
                <WithTopBigMg>
                    <Logo />
                </WithTopBigMg>
                <WithTopExtraMg>
                    <View style={[flexBoxRow.CenterCenter]}>
                        <StyledText color={colorScheme.defaultColors.secColor}>Выберите аккаунт</StyledText>
                    </View>
                </WithTopExtraMg>
                <ScrollViewWithoutBounce>
                    <WithTopDefMg>
                        {savedUserData.map((item) => {
                            let domain: string = '';
                            if (item.domain) {
                                domain = item.domain + '\\';
                            }

                            return <SelectableUserItem key={Math.random()} domain={domain} userName={item.userName} serverAdress={item.protocol + item.serverAddres} onPress={() => selectableUserItemPressEvent(item.userName, item.serverAddres)} />;
                        })}
                    </WithTopDefMg>
                </ScrollViewWithoutBounce>
                <Pressable
                    onPress={async () => {
                        await goTologinPage();
                    }}
                >
                    <View style={flexBoxRow.CenterCenter}>
                        <StyledFontAwasomeIcon icon={faPlusCircle} color={colorScheme.defaultColors.defaultBackgroundColor} />
                        <View style={{ marginLeft: margins.exSmallMargin }}>
                            <StyledText color={colorScheme.defaultColors.defaultBackgroundColor}>Добавить аккаунт</StyledText>
                        </View>
                    </View>
                </Pressable>
            </WithLoginScreen>
        );
    }

    function getView() {
        ViewModel.setNavigation(navigation);
        if (isLoading) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator animating={true} color={'#1E90FF'} size={100} />
                </View>
            );
        } else
            switch (loggedIn) {
                case AuthState.logouted: {
                    if (savedUserData != []) {
                        return PickUserPage();
                    } else {
                        return LoginPage();
                    }
                }
                case AuthState.undefined: {
                    return LoginPage();
                }
            }
    }

    interface IWithLoginScreen {
        appFooterUi: JSX.Element;
    }

    const WithLoginScreen: FC<IWithLoginScreen> = ({ children, appFooterUi }) => {
        return (
            <WithLinearGradient>
                <SafeAreaView>
                    <View style={[flexBoxColumn.FlexStartFlexStart, { height: '100%' }]}>
                        <View style={{ flex: 1 }}>
                            <Container paddingTop={paddings.extraPadding}>
                                <KeyboardAvoidingView height={/* isKeyboard ? height : */ 'auto'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                    <DefaultCard>{children}</DefaultCard>
                                </KeyboardAvoidingView>
                            </Container>
                        </View>
                        {appFooterUi}
                    </View>
                </SafeAreaView>
            </WithLinearGradient>
        );
    };

    return <View style={{ flex: 1 }}>{getView()}</View>;
    //TODO добавить дополнительные возможности для входа
}

export default LoginScreen;
