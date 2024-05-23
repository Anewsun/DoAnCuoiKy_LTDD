import { WINDOW_HEIGHT } from "@constants";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { makeStyles } from "@utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import DrawerItem, { DrawerItemProps } from "./drawer-item";
import { useAppSelector } from "@redux";

const DRAWER_SPACING = WINDOW_HEIGHT * 0.09;

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { t } = useTranslation([], { keyPrefix: "component.drawerCustom" });
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.auth.user);

  const indexRoute = JSON.stringify(navigation.getState().routes[0].state);

  console.log(indexRoute);
  const items: Array<any> = [
    {
      title: t("home"),
      onPress: () => {
        navigation.navigate("Home");
      },
    },
    user?.isAdmin && {
      title: t("post"),
      onPress: () => {
        navigation.navigate("ComicList");
      },
    },
    !user?.isAdmin && {
      title: t("favorite"),
      onPress: () => {
        navigation.navigate("FavoriteList");
      },
    },
  ];

  const styles = useStyles();
  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          data={items}
          renderItem={({ item }) => {
            if (item !== false) {
              return <DrawerItem {...item} />;
            } else return null;
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: DRAWER_SPACING + 30,
  },
}));
