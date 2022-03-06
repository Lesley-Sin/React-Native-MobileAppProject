import { CustomViewToken } from "./CustomViewToken";

export interface IViewableItemsChangedParams<T> {
    viewableItems: CustomViewToken<T>[];
    changed: CustomViewToken<T>[]
};
