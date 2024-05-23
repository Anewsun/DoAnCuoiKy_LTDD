import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { useTheme } from "@hooks";
import { Theme } from "@styles";

export const makeStyles: <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
  V
>(
  styles: T | ((theme: Theme, props: V) => T)
) => (props?: V) => T = (styles: any) => (props) => {
  const theme = useTheme();
  return useMemo(() => {
    const css = typeof styles === "function" ? styles(theme, props) : styles;
    return StyleSheet.create(css);
  }, [props, theme]);
};
