import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedCurrentData } from '../../Authentication/Data/Data';
import { AuthState } from './Enums/AuthState';
import { IAuthenticationState } from './Interfaces/AuthenticationState';

const initialState: IAuthenticationState = {
    loggedIn: AuthState.undefined,
    serverAddress: undefined,
    username: undefined,
    password: undefined,
    showError: false,
    sessionid: undefined,
    token: undefined,
    isLoading: true,
    domain: undefined,
    currentUserData: undefined
};

const AuthenticationSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {

        setLoggedIn(state, action: PayloadAction<AuthState>) {
            state.loggedIn = action.payload;
        },

        setAuthState(state, action: PayloadAction<{ sessionid: string | undefined, token: string | undefined }>) {
            state.sessionid = action.payload.sessionid
            state.token = action.payload.token
        },

        setShowError(state, action: PayloadAction<boolean>) {
            state.showError = action.payload;
        },

        setServerAdress(state, action: PayloadAction<string>) {
            state.serverAddress = action.payload;
        },
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },

        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },

        setDomain(state, action: PayloadAction<string | undefined>) {
            state.domain = action.payload;
        },

        setCurrentUser(state, action: PayloadAction<SavedCurrentData | undefined>) {
            state.currentUserData = action.payload;
        },

        resetLoginPageState(state) {
            state.serverAddress = undefined;
            state.username = undefined;
            state.password = undefined;
            state.showError = false;
            state.domain = undefined;
        },

        resetAuthState(state) {
            state.token = undefined;
            state.sessionid = undefined;
        }

    }
})

export const {
    setLoggedIn,
    setAuthState,
    setShowError,
    setServerAdress,
    setUsername,
    setPassword,
    resetLoginPageState,
    setIsLoading,
    setDomain,
    resetAuthState,
    setCurrentUser
} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer