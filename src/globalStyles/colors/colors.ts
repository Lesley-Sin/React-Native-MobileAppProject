import { StyleSheet } from 'react-native';
import { getColor } from '../utility/utility';
import { ThemeColor } from './enums/colorTypes';

export const commonStyles = {
    color: (themeColor?: ThemeColor, color?: string) =>
        StyleSheet.create({
            common: {
                // fontFamily: 'OpenSans-Regular',
                color: getColor.color(themeColor, color),
            },
        }),
    backgroundColor: (themeBackgroundcolor?: ThemeColor, backgroundcolor?: string) => {
        return StyleSheet.create({
            common: {
                // fontFamily: 'OpenSans-Regular',
                backgroundColor: getColor.backgroundColor(themeBackgroundcolor, backgroundcolor),
            },
        });
    },
};
