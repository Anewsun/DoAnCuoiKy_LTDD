import { useTheme } from "@hooks";
import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";
import React, { useState } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { Icon, TextError } from "@components";

interface InputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  type?: "text" | "password";
  error?: string;
  label?: string;
  multiline?: boolean;
}

const Input: React.FC<InputProps> = React.forwardRef(
  (props, ref: React.Ref<TextInput>) => {
    const {
      style,
      type = "text",
      error,
      label,
      multiline,
      ...inputOtherProps
    } = props;
    const styles = useStyles();
    const theme = useTheme();
    const [rightIcon, setRightIcon] = useState("eye");
    const [passwordVisibility, setPasswordVisibility] = useState(true);

    const handlePasswordVisibility = () => {
      if (rightIcon === "eye") {
        setRightIcon("eye-off");
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === "eye-off") {
        setRightIcon("eye");
        setPasswordVisibility(!passwordVisibility);
      }
    };

    return (
      <View style={style}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.container}>
          <TextInput
            {...inputOtherProps}
            ref={ref}
            placeholderTextColor={theme.colors["blackGrey"]}
            autoComplete={"off"}
            style={[styles.input, multiline && { textAlignVertical: "top" }]}
            multiline={multiline}
            secureTextEntry={type == "password" && passwordVisibility}
          />
          {type === "password" && (
            <TouchableOpacity onPress={handlePasswordVisibility}>
              <Icon
                type={"feather"}
                name={rightIcon}
                size={20}
                color={theme.colors["blackGrey"]}
              />
            </TouchableOpacity>
          )}
        </View>
        <TextError error={error} />
      </View>
    );
  }
);
export default Input;

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    borderColor: theme.colors["border"],
    flexDirection: "row",
  },
  input: {
    minHeight: 45,
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    color: theme.colors["blackDark"],
    flex: 1,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["lg"],
    color: theme.colors["blackDark"],
    marginBottom: 8,
  },
}));
