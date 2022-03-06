import { StyleSheet } from 'react-native';
import { colorScheme, paddings, radiusScheme, sizesScheme } from '../../globalStyles/constants';

export const DropDownStyles = StyleSheet.create({
    common: {
        paddingHorizontal: paddings.defaultPaddings,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    item: {
        height: sizesScheme.ViewBox.element,
        // backgroundColor: 'tra'
    },
});

export const DropDownHeaderStyles = (bottomBorders: boolean) =>
    StyleSheet.create({
        header: {
            height: sizesScheme.ViewBox.header,
            backgroundColor: colorScheme.defaultColors.defaultBackgroundColor,
            borderTopLeftRadius: radiusScheme.defaultDegree,
            borderTopRightRadius: radiusScheme.defaultDegree,
            overflow: 'hidden',
            borderBottomLeftRadius: bottomBorders ? radiusScheme.defaultDegree : 0,
            borderBottomRightRadius: bottomBorders ? radiusScheme.defaultDegree : 0,
        },
    });
