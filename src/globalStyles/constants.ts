// const colorPallete = {
//   themeColors__primary: "#0575bd", // blue
//   themecolors__primary_fade: "#0694EF",
//   themecolors__primary_fadest: "#2FAAF9",
//   themecolors__primary_strong: "#04568B",
//   themecolors__primary_strongest: "#02375A",
//   themecolors__primary_hsl: "203, 95%, 38%",
//   themecolors__primaryTxt: "#ffffff",
//   themecolors__secondary: "#f5f5f5",
//   themecolors__secondary_fade: "#FFFFFF",
//   themecolors__secondary_fadest: "#FFFFFF",
//   themecolors__secondary_strong: "#DCDCDC",
//   themecolors__secondary_strongest: "#C2C2C2",
//   themecolors__secondaryTxt: "#5a5a5a",
//   themecolors__main: "#ffffff",
//   themecolors__main_fade: "#FFFFFF",
//   themecolors__main_fadest: "#FFFFFF",
//   themecolors__main_strong: "#E6E6E6",
//   themecolors__main_strongest: "#CCCCCC",
//   disabledThemeColor: "#444444",
//   //   disabledInputColor: "#efefef",
//   themecolors__btn: "#0575bd",
//   themecolors__btn_fade: "#0694EF",
//   themecolors__btn_strong: "#04568B",
//   themecolors__btnTxt: "#ffffff",
//   themecolors__cancelBtn: "#9d9d9d",
//   themecolors__cancelBtn_fade: "#B6B6B6",
//   themecolors__cancelBtn_strong: "#848484",
//   themecolors__cancelBtnTxt: "#ffffff",
//   themecolors__disabledInputColor: "#b1b1b1",
//   themecolors__text: "#5a5a5a",
//   themecolors__text_fade: "#747474",
//   themecolors__text_fadest: "#8D8D8D",
//   themecolors__text_strong: "#404040",
//   themecolors__success: "#74c365",
//   themecolors__successTxt: "#ffffff",
//   themecolors__error: "#e1462c",
//   themecolors__errorTxt: "#ffffff",
//   themecolors__warning: "#ffda44",
//   themecolors__warningTxt: "#5a5a5a",
//   themecolors__highlight: "#e8f6ff",
//   themecolors__highlightTxt: "#5a5a5a",
//   themecolors__background: "#e3e3e3",
//   themecolors__backgroundTxt: "#5a5a5a",
//   themecolors__red: "#FF0000",
//   themecolors__severityNone: "#0575bd",
//   themecolors__severityNone_fade: "#0694EF",
//   themecolors__severityNone_strong: "#04568B",
//   themecolors__severityNoneTxt: "#ffffff",
//   themecolors__severityLow: "#8ecdf8",
//   themecolors__severityLow_fade: "#BEE2FB",
//   themecolors__severityLow_strong: "#5EB8F5",
//   themecolors__severityLowTxt: "#ffffff",
// };

import { WeightType } from './enums/constants';
import { IFontSchema } from './interfaces/constants';

// export const colorScheme = {
//   defaultBackgroundColor: colorPallete.themecolors__red,
//   mainColor: colorPallete.themecolors__text_strong,
//   secColor: colorPallete.themecolors__main,
//   notificationColor: colorPallete.themecolors__red,
//   greyoutColor: colorPallete.themecolors__secondary_strong,
//   viewBoxBackgroundColor: colorPallete.themecolors__secondary,
//   gradientColor: [
//     colorPallete.themeColors__primary,
//     colorPallete.themeColors__primary,
//     colorPallete.themecolors__severityLow,
//   ],
//   conversationsColors: {
//     background: colorPallete.themeColors__primary,
//     dateColor: colorPallete.themecolors__text_fade,
//     iconFirstColor: colorPallete.themecolors__disabledInputColor,
//     iconSecond: colorPallete.themecolors__success,
//   },
//   dateColors: {
//     background: {
//       normal: colorPallete.themecolors__main,
//       readonly: colorPallete.themecolors__disabledInputColor,
//       disabled: colorPallete.themecolors__disabledInputColor,
//     },
//     text: {
//       normal: colorPallete.themecolors__text,
//       readonly: colorPallete.disabledThemeColor,
//       disabled: colorPallete.disabledThemeColor,
//     },
//     icon: {
//       normal: colorPallete.themecolors__text,
//       readonly: colorPallete.themecolors__text_fadest,
//       disabled: colorPallete.disabledThemeColor,
//     },
//   },
// };

const colorPallete = {
    /* Primary colors  */
    primary: '#0575bd',
    primaryFadest: ' #d6e7f2',
    primaryFade: '#009bfe',
    primaryStrong: '#1b6595',
    primaryStrongest: '#023f67',

    /* Secondary colors  */
    secondary: '#c1c1c1',
    secondaryFadest: '#d6d6d6',
    secondaryFade: '#efefef',
    secondaryStrong: ' #e2e2e2',
    secondaryStrongest: '#5e5e5e',

    /* Text colors  */
    text: '#5a5a5a',
    textFadest: '#999999',
    textFade: '#666666',
    textStrong: '#404040',
    disabledThemeColor: '#444444',

    /* Form colors */
    inputBorderColor: '#d6d6d6',
    select: '#e8f6ff',

    /* Main color  */
    main: '#ffffff',

    /* Button colors */
    cancel: '#9d9d9d',

    /* Status color  */
    error: '#e1462c',
    success: '#74c365',

    menuColor: '#f5f5f5',

    disabledInputColor: '#b1b1b1',
    themecolors__text: '#5a5a5a',

    lightBlue: '#82BADD',

    /* the same colors for default and dark */

    usedHighlighter: '#e5eef3',
    titleBorder: ' #eeeeee',
    h3Card: '#182026',
    scrollbarThumb: 'rgba(0, 0, 0, 0.1)',
};

export const colorScheme = {
    defaultColors: {
        mainColor: colorPallete.main,
        mainHalfOpacity: `${colorPallete.main}50`,
        secColor: colorPallete.text,
        defaultBackgroundColor: colorPallete.primary,
        defaultUnactiveBackgroundColor: colorPallete.lightBlue,
        greyoutColor: colorPallete.cancel,
        selectColor: colorPallete.select,
        gradientColor: [
            colorPallete.primary,
            `${colorPallete.primary}90`,
            `${colorPallete.primary}50`,
            // colorPallete.main,
        ],
    },
    menuColor: {
        default: colorPallete.menuColor,
    },
    conversationsColors: {
        background: colorPallete.main,
        dateColor: colorPallete.cancel,
        iconFirstColor: colorPallete.cancel,
        iconSecond: colorPallete.primary,
    },
    dateColors: {
        background: {
            normal: colorPallete.main,
            readonly: colorPallete.disabledInputColor,
            disabled: colorPallete.disabledInputColor,
        },
        text: {
            normal: colorPallete.themecolors__text,
            readonly: colorPallete.disabledThemeColor,
            disabled: colorPallete.disabledThemeColor,
        },
        icon: {
            normal: colorPallete.themecolors__text,
            readonly: colorPallete.textFadest,
            disabled: colorPallete.disabledThemeColor,
        },
        border: {
            normal: colorPallete.secondaryFadest,
        },
    },
    formColors: {
        mainColor: colorPallete.secondaryFadest,
        paleSelectColor: colorPallete.select,
    },
    viewBoxColors: {
        viewBoxBackgroundColor: colorPallete.primary,
        borderColor: colorPallete.secondaryFadest,
    },
    notificationColors: {
        error: colorPallete.error,
        success: colorPallete.success,
    },
    buttonColors: {
        defaultBackground: colorPallete.primary,
        defaultUnactiveBackground: colorPallete.lightBlue,
        cancelBackground: colorPallete.cancel,
    },
    statusTaskColors: {
        critical: colorPallete.error,
        usuall: colorPallete.success,
        wish: colorPallete.cancel,
    },
};

export const radiusScheme = {
    defaultDegree: 5,
    bigRadius: 7,
};

export const paddings = {
    smallPadding: 10,
    defaultPaddings: 15,
    bigPadings: 20,
    extraPadding: 40,
    viewBox: {},
};

export const margins = {
    exSmallMargin: 5,
    smallMargin: 10,
    deafaultMargins: 15,
    largeMargin: 20,
    extraMargin: 40,
};

export const fontScheme: IFontSchema = {
    h1: {
        size: 30,
        weight: WeightType.Normal,
    },
    h2: {
        size: 20,
        weight: WeightType.Normal,
    },
    h3: {
        size: 17,
        weight: WeightType.Normal,
    },
    form: {
        size: 17,
        weight: WeightType.Normal,
    },
    btn: {
        size: 17,
        weight: WeightType.Bold,
    },
    text: {
        size: 17,
        weight: WeightType.Normal,
    },
    smallText: {
        size: 14,
        weight: WeightType.Normal,
    },
    extraSmallText: {
        size: 10,
        weight: WeightType.Normal,
    },
};

export const sizesScheme = {
    workspace: {
        height: 45,
    },
    InputBtn: {
        default: {
            height: 35,
        },
        stretch: {
            height: 40,
        },
        square: {
            height: 35,
            width: 35,
        },
    },

    ViewBox: {
        header: 30,
        element: 30,
    },
    Icons: {
        default: 20,
    },
    Logo: {
        default: 35,
    },
    table: {
        height: 35,
    },
};
