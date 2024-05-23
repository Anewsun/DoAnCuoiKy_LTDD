import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFavorite } from "@types";

const initialState: Array<IFavorite> = [];

export const favoriteSlice = createSlice({
  name: "favoriteSlice",
  initialState: initialState,
  reducers: {
    setFavorite: (state, action: PayloadAction<Array<IFavorite>>) => {
      state = action.payload;
      return state;
    },
  },
});

const { reducer, actions } = favoriteSlice;
export const { setFavorite } = actions;
export default reducer;
