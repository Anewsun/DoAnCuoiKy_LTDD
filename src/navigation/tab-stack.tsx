import { TabBar } from "@components";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  ComicListScreen,
  FavoriteListScreen,
  HomeScreen,
  ProfileScreen,
} from "@screens";
import React from "react";

const Stack = createBottomTabNavigator();

const options: BottomTabNavigationOptions = {
  headerShown: false,
};

const TabStack: React.FC = () => {
  return (
    <Stack.Navigator
      tabBar={(props: BottomTabBarProps) => {
        return <TabBar {...props} />;
      }}
      screenOptions={options}
    >
      <Stack.Screen name={"Home"} component={HomeScreen} />
      <Stack.Screen name={"Profile"} component={ProfileScreen} />
      {/* <Stack.Screen name={"FavoriteList"} component={FavoriteListScreen} />
      <Stack.Screen name={"ComicList"} component={ComicListScreen} /> */}
    </Stack.Navigator>
  );
};

export default TabStack;
