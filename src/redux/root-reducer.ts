import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import appReducer from "./slices/app.slice";
import favoriteReducer from "./slices/favorite.slice";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  favorite: favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
