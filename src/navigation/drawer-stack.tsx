import { DrawerContent } from "@components";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { makeStyles } from "@utils";
import React from "react";
import TabStack from "./tab-stack";
import { useAppSelector } from "@redux";
import { ComicListScreen, FavoriteListScreen } from "@screens";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const options: DrawerNavigationOptions = {
  headerShown: false,
  drawerType: "back",
  // overlayColor: "transparent",
  drawerStyle: {
    backgroundColor: "transparent",
    width: "66%",
  },
};

const MyStack = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Drawer.Navigator
      screenOptions={options}
      // drawerContent={(props) => {
      //   return <DrawerContent {...props} />;
      // }}
    >
      <Stack.Screen name={"Trang chủ"} component={TabStack} />
      {user?.isAdmin && (
        <Stack.Screen name={"Đăng bài"} component={ComicListScreen} />
      )}
      {!user?.isAdmin && (
        <Stack.Screen
          name={"Truyện đã yêu thích"}
          component={FavoriteListScreen}
        />
      )}
    </Drawer.Navigator>
  );
};

export default MyStack;

const useStyles = makeStyles((theme) => ({
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    transform: [{ scaleY: 0.8 }],
  },
}));
