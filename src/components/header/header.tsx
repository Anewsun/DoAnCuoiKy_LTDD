import { Icon } from "@components";
import { STATUS_BAR_HEIGHT } from "@constants";
import { useNavigation } from "@react-navigation/native";
import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  isBack?: boolean;
  title?: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  isBackType?: "close" | "back";
}

const Header: React.FC<HeaderProps> = (props) => {
  const {
    isBack = true,
    title,
    onBack,
    rightComponent,
    isBackType = "back",
  } = props;
  const styles = useStyles();
  const navigation = useNavigation();

  const onBackPress = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.canGoBack() && navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {isBack && (
          <TouchableOpacity onPress={onBackPress}>
            {isBackType == "back" ? (
              <Icon
                name="chevron-thin-left"
                type={"entypo"}
                style={styles.icon}
              />
            ) : (
              <Icon
                name="close"
                type={"ant-design"}
                style={styles.icon}
                size={24}
              />
            )}
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {rightComponent}
      </View>
    </View>
  );
};

export default Header;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: STATUS_BAR_HEIGHT + 10,
    paddingBottom: 10,
  },
  title: {
    flex: 1,
    textAlignVertical: "center",
    fontFamily: fonts.medium,
    fontSize: fontSizes["2xl"],
    color: theme.colors["blackDark"],
    textAlign: "center",
  },
  icon: {
    paddingRight: 12,
  },
}));
