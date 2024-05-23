import { useTheme } from "@hooks";
import React from "react";
import { OpaqueColorValue } from "react-native";
import { IconButtonProps } from "react-native-vector-icons/Icon";
import { getIconType } from "./utils";

export type IconType =
  | "ant-design"
  | "entypo"
  | "evilicon"
  | "feather"
  | "font-awesome"
  | "font-awesome-5"
  | "fontisto"
  | "foundation"
  | "ionicon"
  | "material"
  | "material-community"
  | "octicon"
  | "zocial"
  | "simple-line-icon";

export interface IconProps extends IconButtonProps {
  color?: string | OpaqueColorValue;
  size?: number;
  type: IconType;
}

const Icon: React.FC<IconProps> = (props) => {
  const theme = useTheme();
  const {
    size = 20,
    type = "ionicon",
    color = theme.colors["blackDark"],
    ...rest
  } = props;
  const IconComponent = getIconType(type);

  return <IconComponent type={type} size={size} color={color} {...rest} />;
};

export default Icon;
