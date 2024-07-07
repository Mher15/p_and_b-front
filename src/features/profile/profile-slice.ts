import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { avaibleLocalies } from "../../app/translation";
import { IUser } from "../../app/types";
interface ProfileState {
  locale: string;
  user: IUser | null;
}

const initialState: ProfileState = {
  locale: avaibleLocalies.ru_RU,
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
    },
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { setLocale, setUser } = profileSlice.actions;
export default profileSlice.reducer;
