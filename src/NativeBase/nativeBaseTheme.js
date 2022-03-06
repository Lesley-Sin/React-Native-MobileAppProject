import {
  extendTheme
} from "native-base";
import {
  colorScheme,
  fontScheme
} from "../globalStyles/constants";

export const nativeBaseTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: colorScheme.defaultColors.defaultBackgroundColor,
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },

    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
    selectors: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: colorScheme.formColors.mainColor,
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    }
  },
  components: {
    Button: {
      baseStyle: () => {
        return {
          _disabled: {
            opacity: 1,
          }
        };
      },
      defaultProps: {},
      variants: {},
      sizes: {
        xl: {
          fontSize: '64px'
        },
        lg: {
          fontSize: '32px'
        },
        md: {
          fontSize: '16px'
        },
        sm: {
          fontSize: fontScheme.text
        },
      },
    },
    Input: {
      baseStyle: {},
      defaultProps: {},
      variants: {},
      sizes: {

        xl: {
          fontSize: '64px'
        },
        lg: {
          fontSize: '32px'
        },
        md: {
          fontSize: '16px'
        },
        sm: {
          fontSize: '12px'
        },

      },
    },
    FormControl: {
      baseStyle: {},
      defaultProps: {},
      variants: {},
      sizes: {

      },
    },
    Radio: {
      baseStyle: {

      },
      defaultProps: {
        colorScheme: 'selectors'
      },
      variants: {},
      sizes: {
        md: {
          _icon: {
            size: 3
          }
        }
      },
    },
    Checkbox: {
      baseStyle: () => {
        return {
          _checkbox: {
            borderRadius: 5
          }

        };
      },
      defaultProps: {},
      variants: {},

    }
  }

});