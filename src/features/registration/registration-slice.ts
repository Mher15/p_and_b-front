import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IMentorDto,
  IReferralLink,
  IRegistrationUserData,
} from "../../app/types";

interface RegistrationSliceState {
  userData: IRegistrationUserData | null;
  link: IReferralLink | null;
  mentor: IMentorDto | null;
}

const initialState: RegistrationSliceState = {
  userData: null,
  link: null,
  mentor: null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IRegistrationUserData | null>) {
      state.userData = action.payload;
    },
    setLink(state, action: PayloadAction<IReferralLink | null>) {
      state.link = action.payload;
    },
    setMentorDto(state, action: PayloadAction<IMentorDto | null>) {
      state.mentor = action.payload;
    },
  },
});

export const { setUserData, setLink, setMentorDto } = registrationSlice.actions;
export default registrationSlice.reducer;
