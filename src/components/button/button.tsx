import { useTheme } from "@hooks";
import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";
import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title?: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  type?: "solid" | "outline";
  block?: boolean;

  /**
   * Uppercase button title
   */
  uppercase?: boolean;

  titleStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    title,
    disabled,
    onPress,
    style,
    type = "solid",
    block = false,
    uppercase = false,
    titleStyle,
  } = props;
  const styles = useStyles(props);
  const theme = useTheme();

  const renderTextColor = () => {
    if (type == "outline") {
      return theme.colors["primary"];
    } else return theme.colors["white"];
  };

  return (
    <View style={[!block && { flexDirection: "row" }]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.container,
          type == "outline" ? styles.buttonOutline : styles.buttonSolid,
          style,
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: renderTextColor(),
            },
            uppercase && {
              textTransform: "uppercase",
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles((theme, props: ButtonProps) => ({
  container: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 45,
  },
  buttonSolid: {
    backgroundColor: theme.colors["primary"],
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: theme.colors["primary"],
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
  },
}));

export default Button;
