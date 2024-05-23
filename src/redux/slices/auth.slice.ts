import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@types";

export interface IAuth {
  isAuthenticated?: boolean;
  user?: IUser;
}

const initialState: IAuth = {
  isAuthenticated: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state = {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
      return state;
    },
    removeUser: (state) => {
      state = { ...initialState };
      return state;
    },
    updateUser: (state, action: PayloadAction<{ fullname: string }>) => {
      const userNew: any = { ...state.user, fullname: action.payload.fullname };
      state = {
        ...state,
        user: userNew,
      };
      return state;
    },
  },
});

const { reducer, actions } = authSlice;
export const { setUser, removeUser, updateUser } = actions;
export default reducer;
