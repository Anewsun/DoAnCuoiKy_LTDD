import { Loading } from "@components";
import "@config";
import { PortalProvider } from "@gorhom/portal";
import {
  favoriteSlice,
  persistor,
  store,
  useAppDispatch,
  useAppSelector,
} from "@redux";
import { getFavoritesWithUserService } from "@services";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n";
import RootStack from "./navigation/root-stack";

const MainApp = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.app.loading);
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    user?.isAdmin == false &&
      getFavoritesWithUserService(user?.id, (data) => {
        dispatch(favoriteSlice.actions.setFavorite(data));
      });
  }, [user]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PortalProvider>
          <StatusBar
            translucent
            backgroundColor={"transparent"}
            barStyle={"dark-content"}
          />
          <RootStack />
          {isLoading && <Loading />}
          <FlashMessage position="top" />
        </PortalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
