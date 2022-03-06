import { ViewToken } from "react-native";

export interface CustomViewToken<T> extends ViewToken {
    item: T;
    key: string;
    index: number | null;
    isViewable: boolean;
    section?: any;
};