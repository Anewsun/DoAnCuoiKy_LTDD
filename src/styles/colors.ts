export const colors = {
  black: "#000",
  white: "#fff",
  red: "#cc5452",
  orange: "#fd7e14",
  yellow: "#fcb332",
  turquoise: "#39b3cc",
  lightgray: "#d6d7d7",
  darkBlue: "#3f52a3",
};
export interface ColorOptions {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  success: string;
  error: string;
  warning: string;
  disabled: string;
  divider: string;
  white: string;
  black: string;
  blackDark: string;
  blackLight: string;
  blackGrey: string;
  border: string;
  notification: string;
  backdrop: string;
  shadow: string;
}

export const lightColors: ColorOptions = {
  primary: "#6e63e8",
  secondary: "#f1c40f",
  background: "'rgb(242, 242, 242)'",
  card: "rgb(255, 255, 255)",
  success: "#52c41a",
  error: "#ff190c",
  warning: "#faad14",
  disabled: "#hsl(208, 8%, 90%)",
  divider: "#e0e0e0",
  white: colors.white,
  black: colors.black,
  blackDark: "rgb(51,45,45)",
  blackLight: "rgb(79,79,79)",
  blackGrey: "rgba(0,0,0,.5)",
  border: "#e0e0e0",
  notification: "rgb(255, 69, 58)",
  backdrop: "rgba(55, 46, 52, 0.4)",
  shadow: "rgb(0, 0, 0)",
};

export interface Theme {
  colors: ColorOptions;
}
