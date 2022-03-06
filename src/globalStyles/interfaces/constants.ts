import { WeightType } from '../enums/constants';

export interface IFontSchema {
    h1: Fonts;
    h2: Fonts;
    h3: Fonts;
    form: Fonts;
    text: Fonts;
    smallText: Fonts;
    extraSmallText: Fonts;
    btn: Fonts;
}

interface Fonts {
    size: number;
    weight: WeightType;
}
