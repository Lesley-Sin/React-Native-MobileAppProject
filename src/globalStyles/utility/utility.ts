import { colorScheme } from '../../globalStyles/constants';
import { ThemeColor } from '../colors/enums/colorTypes';

const getThemeColor = (themeColor: ThemeColor) => {
    switch (themeColor) {
        case ThemeColor.mainColor:
            return colorScheme.defaultColors.mainColor;
        case ThemeColor.defaultBackground:
            return colorScheme.defaultColors.defaultBackgroundColor;
        case ThemeColor.secColor:
            return colorScheme.defaultColors.secColor;
    }
};

const getCustomColor = (primaryColor: string, themeColor?: ThemeColor, color?: string) => {
    let textColor = primaryColor;
    if (themeColor) {
        textColor = getThemeColor(themeColor);

        return textColor;
    }
    if (color) {
        textColor = color;
        return textColor;
    }
    return textColor;
};

export const getColor = {
    color: (themeColor?: ThemeColor, color?: string) => getCustomColor(colorScheme.defaultColors.mainColor, themeColor, color),
    backgroundColor: (themeColor?: ThemeColor, color?: string) => getCustomColor(colorScheme.defaultColors.defaultBackgroundColor, themeColor, color),
};
