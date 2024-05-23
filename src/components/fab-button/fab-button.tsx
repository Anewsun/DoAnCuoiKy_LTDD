import { Icon, IconProps } from "@components";
import { colors } from "@styles";
import { makeStyles } from "@utils";
import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

const BUTTON_WIDTH = 60;

interface FabButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: IconProps;
}

const FabButton: React.FC<FabButtonProps> = (props) => {
  const { onPress, style, icon } = props;
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {icon ? (
        <Icon {...icon} style={styles.iconColor} />
      ) : (
        <Icon name={"search1"} type={"ant-design"} style={styles.iconColor} />
      )}
    </TouchableOpacity>
  );
};

export default FabButton;

const useStyles = makeStyles((theme) => ({
  container: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: colors["turquoise"],
    justifyContent: "center",
    alignItems: "center",
  },
  iconColor: {
    color: theme.colors.white,
  },
}));
