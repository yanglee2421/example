import React from "react";

const color = (
  main: string,
  light: string,
  dark: string,
  contrastText: string
) => ({ main, light, dark, contrastText });

const black = "#000";
const white = "#fff";
const common = { black, white };
const shape = { borderRadius: 4 };
const spacing = (abs: number) => abs * 4;

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

const htmlFontSize = 16;
const fontFamily = "SpaceMono";

type FontWeight = "300" | "400" | "500" | "600" | "700";
type TextTransform = "uppercase" | "lowercase";

const text = (
  fontWeight: FontWeight,
  size: number,
  lh: number,
  ls: number,
  textTransform?: TextTransform
) => ({
  fontFamily,
  fontWeight,
  fontSize: htmlFontSize * size,
  lineHeight: htmlFontSize * size * lh,
  letterSpacing: htmlFontSize * size * ls,
  textTransform,
});

const typography = {
  htmlFontSize,
  fontFamily,
  fontSize: 14,
  fontWeightLight: "300" as const,
  fontWeightRegular: "400" as const,
  fontWeightMedium: "500" as const,
  fontWeightBold: "700" as const,

  h1: text("300", 6, 1.167, -0.01562),
  h2: text("300", 3.75, 1.2, -0.00833),
  h3: text("400", 3, 1.167, 0),
  h4: text("400", 2.125, 1.235, 0.00735),
  h5: text("400", 1.5, 1.334, 0),
  h6: text("500", 1.25, 1.6, 0.0075),
  subtitle1: text("400", 1, 1.75, 0.00938),
  subtitle2: text("500", 0.875, 1.57, 0.00714),

  body1: {
    fontFamily,
    fontWeight: "400" as const,
    fontSize: htmlFontSize * 1,
    lineHeight: htmlFontSize * 1 * 1.5,
    letterSpacing: htmlFontSize * 1 * 0.00938,
  },
  body2: text("400", 0.875, 1.42, 0.01071),
  button: {
    fontFamily,
    fontWeight: "500" as const,
    fontSize: htmlFontSize * 0.875,
    lineHeight: htmlFontSize * 0.875 * 1.75,
    letterSpacing: htmlFontSize * 0.875 * 0.02857,
    textTransform: "uppercase" as const,
  },
  caption: text("400", 0.75, 1.66, 0.03333),
  overline: text("400", 0.75, 2.66, 0.08333, "uppercase"),
};

const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

export const lightTheme = {
  breakpoints,
  shape,
  spacing,
  typography,
  zIndex,
  palette: {
    common,
    mode: "light",

    primary: color("#1976d2", "#42a5f5", "#1565c0", white),
    secondary: color("#9c27b0", "#ba68c8", "#7b1fa2", white),
    error: color("#d32f2f", "#ef5350", "#c62828", white),
    warning: color("#ed6c02", "#ff9800", "#e65100", white),
    info: color("#0288d1", "#03a9f4", "#01579b", white),
    success: color("#2e7d32", "#4caf50", "#1b5e20", white),

    grey: {},

    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
      icon: "rgba(0, 0, 0, 0.87)",
    },

    divider: "rgba(0, 0, 0, 0.12)",

    background: {
      paper: white,
      default: white,
    },

    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
};

export const darkTheme = {
  breakpoints,
  shape,
  spacing,
  typography,
  zIndex,
  palette: {
    common,
    mode: "dark",

    primary: {
      main: "#90caf9",
      light: "#e3f2fd",
      dark: "#42a5f5",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#ce93d8",
      light: "#f3e5f5",
      dark: "#ab47bc",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },

    grey: {},

    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
    },

    divider: "rgba(255, 255, 255, 0.12)",

    background: {
      paper: "#121212",
      default: "#121212",
    },

    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.12,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  },
};

export const ThemeContext = React.createContext(lightTheme);

export const useTheme = () => React.useContext(ThemeContext);
