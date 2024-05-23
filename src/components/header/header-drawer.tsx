import { Icon } from "@components";
import { STATUS_BAR_HEIGHT } from "@constants";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderDrawerProps {
  title?: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = (props) => {
  const { title, onBack, rightComponent } = props;
  const styles = useStyles();
  const navigation = useNavigation();

  const isDrawerOpen = useDrawerStatus() === "open";

  const onBackPress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={onBackPress}>
          {!isDrawerOpen ? (
            <Icon name={"md-menu-sharp"} type={"ionicon"} size={24} />
          ) : (
            <Icon name={"arrow-back"} type={"ionicon"} size={24} />
          )}
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        {rightComponent ? (
          rightComponent
        ) : (
          <Icon
            name={"md-menu-sharp"}
            type={"ionicon"}
            size={24}
            color={"transparent"}
          />
        )}
      </View>
    </View>
  );
};

export default HeaderDrawer;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: STATUS_BAR_HEIGHT + 10,
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  title: {
    flex: 1,
    textAlignVertical: "center",
    fontFamily: fonts.medium,
    fontSize: fontSizes["2xl"],
    color: theme.colors["blackDark"],
    textAlign: "center",
  },
}));
