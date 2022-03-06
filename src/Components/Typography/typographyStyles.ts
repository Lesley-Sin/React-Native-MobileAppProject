import { StyleSheet } from 'react-native';
import { fontScheme } from '../../globalStyles/constants';
import { WeightType } from '../../globalStyles/enums/constants';

export const styles = (fontSize?: number, fontWeight?: WeightType) =>
    StyleSheet.create({
        extraSmallText: {
            fontSize: fontSize ? fontSize : fontScheme.extraSmallText.size,
            fontWeight: fontWeight ? fontWeight : fontScheme.text.weight,
            lineHeight: 10,
        },
        smallText: {
            fontSize: fontSize ? fontSize : fontScheme.smallText.size,
            fontWeight: fontWeight ? fontWeight : fontScheme.text.weight,
        },
        text: {
            fontSize: fontSize ? fontSize : fontScheme.text.size,
            lineHeight: fontSize ? fontSize : 17,
        },
        h1: {
            fontSize: fontSize ? fontSize : fontScheme.h1.size,
            fontWeight: fontScheme.h1.weight,
        },
        h2: {
            fontSize: fontSize ? fontSize : fontScheme.h2.size,
            fontWeight: fontScheme.h2.weight,
        },
        h3: {
            fontSize: fontSize ? fontSize : fontScheme.h3.size,
        },
    });
