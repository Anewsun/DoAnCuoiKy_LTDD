import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";
import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface TextErrorProps {
  error?: string;
  style?: StyleProp<ViewStyle>;
}

const TextError: React.FC<TextErrorProps> = (props) => {
  const { error, style } = props;
  const styles = useStyles();

  if (error == undefined) return null;

  return (
    <View style={style}>
      <Text style={styles.error}>~ {error}</Text>
    </View>
  );
};

export default TextError;

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.colors["error"],
    fontFamily: fonts.medium,
    fontSize: fontSizes.md,
  },
}));
