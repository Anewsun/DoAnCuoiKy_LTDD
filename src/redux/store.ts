import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rootReducer, { RootState } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
export const persistor = persistStore(store);
