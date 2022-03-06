import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPageServiceState } from './Interfaces/PageServiceState';

const initialState: IPageServiceState = {
    pageIsLoading: false,
    isDataLoaded: false,
    componentIsLoading: false,
    isEditingMode: false,
    objectId: undefined,
    objectTitle: undefined,
};

const PageServiceSlice = createSlice({
    name: 'PageService',
    initialState,
    reducers: {
        setComponentIsLoading(state, action: PayloadAction<boolean>) {
            state.componentIsLoading = action.payload;
        },

        setPageIsLoaded(state, action: PayloadAction<boolean>) {
            state.pageIsLoading = action.payload;
        },

        setListEditingMode(state, action: PayloadAction<boolean>) {
            state.isEditingMode = action.payload;
        },

        setObjectId(state, action: PayloadAction<string | undefined>) {
            state.objectId = action.payload;
        },

        setObjectTitle(state, action: PayloadAction<string | undefined>) {
            state.objectTitle = action.payload;
        },

        setIsDataLoaded(state, action: PayloadAction<boolean>) {
            state.isDataLoaded = action.payload;
        },
    },
});

export const { setComponentIsLoading, setPageIsLoaded, setListEditingMode, setObjectId, setIsDataLoaded, setObjectTitle } = PageServiceSlice.actions;
export default PageServiceSlice.reducer;
