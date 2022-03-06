//framework dependencies
import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { nativeBaseTheme } from './src/NativeBase/nativeBaseTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

//redux
import { Provider } from 'react-redux';
import store from './src/AppState/Store';

//secure store
import * as SecureStore from 'expo-secure-store';

//components
import RootNavigator from './src/Navigation/NavigationConfiguration/RootNavigator';
import ModalFormView from './src/Components/ModalForm/ModalFormView';
import { ToastNotificationController } from './src/Toaster/ToastNotificationController';

//data access layers implementations
import { TestNavigationDAL } from './src/Navigation/DataAccessLayer/TestNavigationDAL';
import { RealNavigationDAL } from './src/Navigation/DataAccessLayer/RealNavigationDAL';
import { TestAuthenticationDAL } from './src/Authentication/DataAccessLayer/TestAuthenticationDAL';
import { RealAuthenticationDAL } from './src/Authentication/DataAccessLayer/RealAuthenticationDAL';
import { AuthenticationViewModel } from './src/Authentication/ViewModels/AuthenticationViewModel';
import { RealSearchDAL } from './src/Search/DataAccessLayer/RealSearchDAL';
import { TestSearchDAL } from './src/Search/DataAccessLayer/TestSearchDAL';
import { RealNotificationDAL } from './src/Notifications/DataAccessLayer/RealNotificationsDAL';
import { TestNotificationDAL } from './src/Notifications/DataAccessLayer/TestNotificationsDAL';
import { RealConversationDAL } from './src/Conversations/DataAccessLayer/RealConversationDAL';
import { TestConversationDAL } from './src/Conversations/DataAccessLayer/TestConversationDAL';
import { TestMyProfileDAL } from './src/MyProfile/DataAccessLayer/TestMyProfileDAL';
import { RealMyProfileDAL } from './src/MyProfile/DataAccessLayer/RealMyProfileDAL';

//mediators
import { ModulesMediator } from './src/AppMediator/ModulesMediator';
import { MessagingHubMediator } from './src/AppMediator/MessagingHubMediator';

//services
import { PageService } from './src/Components/Page/PageService';
import { UserCommandExecutionService } from './src/UserCommandExecutionService/UserCommandExecutionService';
import { ModalFormService } from './src/Components/ModalForm/ModalFormService';
import { toastNotificationService } from './src/utility/Services';

//types and interfaces
import type { IAuthenticationDAL } from './src/Authentication/Interfaces/IAuthenticationDAL';
import type { ISearchDAL } from './src/Search/Interfaces/ISearchDAL';
import type { IPageService } from './src/Components/Page/Interfaces/IPageService';
import type { IMyProfileDAL } from './src/MyProfile/Interfaces/IMyProfileDAL';
import type { IConversationDAL } from './src/Conversations/DataAccessLayer/IConversationDAL';
import type { INotificationDAL } from './src/Notifications/Interfaces/INotificationDAL';
import type { INavigationDAL } from './src/Navigation/DataAccessLayer/INavigationDAL';
import type { IUserCommandExecutionService } from './src/UserCommandExecutionService/Models/IUserCommandExecutionService';

async function ttt() {
    await SecureStore.deleteItemAsync('currentUser');
    await SecureStore.deleteItemAsync('usersData');
}

// ttt();

let initType = 'test';

export const NavigationDAL = (): INavigationDAL => {
    if (initType === 'test') {
        return new TestNavigationDAL(_Mediator, userCommandExecutionService);
    }
    if (initType === 'real') {
        return new RealNavigationDAL(_Mediator, userCommandExecutionService);
    } else return new TestNavigationDAL(_Mediator, userCommandExecutionService);
};

const AuthenticationDAL = (): IAuthenticationDAL => {
    if (initType === 'test') {
        return new TestAuthenticationDAL(_Mediator);
    }
    if (initType === 'real') {
        return new RealAuthenticationDAL(_Mediator);
    }
    return new TestAuthenticationDAL(_Mediator);
};

const SearchDAL = (): ISearchDAL => {
    if (initType === 'test') {
        return new TestSearchDAL(_Mediator);
    }
    if (initType === 'real') {
        return new RealSearchDAL(_Mediator);
    }
    return new TestSearchDAL(_Mediator);
};

const NotificationDAL = (): INotificationDAL => {
    if (initType === 'test') {
        return new TestNotificationDAL(_Mediator, _MessagingHubMediator);
    }
    if (initType === 'real') {
        return new RealNotificationDAL(_Mediator, _MessagingHubMediator);
    }
    return new TestNotificationDAL(_Mediator, _MessagingHubMediator);
};

const ConversationDAL = (): IConversationDAL => {
    if (initType === 'test') {
        return new TestConversationDAL(_MessagingHubMediator);
    }
    if (initType === 'real') {
        return new RealConversationDAL(_MessagingHubMediator);
    }
    return new TestConversationDAL(_MessagingHubMediator);
};

const ProfileDAL = (): IMyProfileDAL => {
    if (initType === 'test') {
        return new TestMyProfileDAL(_Mediator);
    }
    if (initType === 'real') {
        return new RealMyProfileDAL(_Mediator);
    }
    return new TestMyProfileDAL(_Mediator);
};

//resolve dependencies
const _MessagingHubMediator = new MessagingHubMediator();
const _Mediator = new ModulesMediator(_MessagingHubMediator);
const userCommandExecutionService: IUserCommandExecutionService = new UserCommandExecutionService(
    _Mediator,
    toastNotificationService
);
const pageService: IPageService = new PageService(_Mediator, userCommandExecutionService);
const modalFormService = new ModalFormService(pageService, userCommandExecutionService, _Mediator);
const authenticationDAL = AuthenticationDAL();
const navigationDAL = NavigationDAL();
const searchDAL = SearchDAL();
const profileDAL = ProfileDAL();
const notificationDAL = NotificationDAL();
const conversationDAL = ConversationDAL();
const _AuthenticationViewModel = new AuthenticationViewModel(authenticationDAL);

function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <NativeBaseProvider theme={nativeBaseTheme}>
                        <StatusBar />
                        <ModalFormView modalFormService={modalFormService} />
                        <ToastNotificationController toastNotificationService={toastNotificationService} />
                        <RootNavigator
                            mediator={_Mediator}
                            viewModel={_AuthenticationViewModel}
                            searchDAL={searchDAL}
                            notificationDAL={notificationDAL}
                            navigationDAL={navigationDAL}
                            myProfileDAL={profileDAL}
                            conversationDAL={conversationDAL}
                            pageService={pageService}
                            ucmdService={userCommandExecutionService}
                        />
                    </NativeBaseProvider>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;
