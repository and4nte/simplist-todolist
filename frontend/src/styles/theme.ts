import { PaletteMode } from '@mui/material';
// import { brown, purple, deepPurple, teal, yellow, deepOrange, grey } from '@mui/material/colors';

const custom = {
  white: '#fff',
  whiteGray: '#f5f5f5',
  gray: '#303030',
  lightGray: '#424242',
  black: '#212121',

  purple: '#BA94D1',
  lightPurple: '#DEBACE',
  darkPurple: '#7F669D',

  peach: '#FFECEF',
  darkPeach: '#FFCACA',

  violet: '#372948',
  darkViolet: '#251B37',
};

// eslint-disable-next-line import/prefer-default-export
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: custom.purple,
            light: custom.lightPurple,
            dark: custom.darkPurple,
          },
          secondary: {
            main: custom.lightPurple,
          },
          divider: custom.darkPurple,
          text: {
            primary: custom.black,
            secondary: custom.lightPurple,
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: custom.darkPeach,
          },
          secondary: {
            main: custom.violet,
          },
          divider: custom.peach,
          text: {
            primary: custom.white,
            secondary: custom.whiteGray,
          },
          background: {
            default: custom.gray,
            paper: custom.lightGray,
          },
        }),
  },
  typography: {
    fontFamily: `"Roboto", "Noto Sans KR"`,
  },
});
