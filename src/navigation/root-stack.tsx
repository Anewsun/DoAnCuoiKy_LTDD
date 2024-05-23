import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { useAppSelector } from "@redux";
import {
  ChangePasswordScreen,
  ComicDetailScreen,
  ComicListScreen,
  ComicReaderScreen,
  ComicReviewsScreen,
  CreateComicScreen,
  CreateReviewScreen,
  EditComicScreen,
  EditProfileScreen,
  EditReviewScreen,
  FavoriteListScreen,
  LoginScreen,
  ResetPasswordScreen,
  SearchScreen,
  SettingsScreen,
  SignUpScreen,
} from "@screens";
import React from "react";
import TabStack from "./tab-stack";
import { RootStackParamList } from "./types";
import DrawerStack from "./drawer-stack";

// some import
import { Animated, Easing } from "react-native";
const Stack = createStackNavigator<RootStackParamList>();

const options: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

const RootStack = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={options}
        initialRouteName={isAuthenticated ? "TabStack" : "Login"}
      >
        <Stack.Screen name={"Login"} component={LoginScreen} />
        <Stack.Screen name={"SignUp"} component={SignUpScreen} />
        <Stack.Screen name={"ResetPassword"} component={ResetPasswordScreen} />
        <Stack.Screen name={"TabStack"} component={DrawerStack} />
        <Stack.Group>
          <Stack.Screen name={"CreateComic"} component={CreateComicScreen} />
          <Stack.Screen name={"ComicReviews"} component={ComicReviewsScreen} />
          <Stack.Screen name={"ComicReader"} component={ComicReaderScreen} />
          <Stack.Screen name={"ComicDetail"} component={ComicDetailScreen} />
          <Stack.Screen name={"EditComnic"} component={EditComicScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name={"CreateReview"} component={CreateReviewScreen} />
          <Stack.Screen name={"EditReview"} component={EditReviewScreen} />
        </Stack.Group>
        <Stack.Screen name={"Settings"} component={SettingsScreen} />
        <Stack.Screen name={"EditProfile"} component={EditProfileScreen} />
        <Stack.Screen name={"Search"} component={SearchScreen} />
        <Stack.Screen
          name={"ChangePassword"}
          component={ChangePasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
