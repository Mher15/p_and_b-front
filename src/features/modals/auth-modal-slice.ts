import { createSlice,  PayloadAction} from "@reduxjs/toolkit";
import { IAuthModal } from "../../app/types";

const initialState: IAuthModal = {
    isOpen: false,
}

const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        setIsAuthModalOpen(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
    }
});

export const {
    setIsAuthModalOpen,
} = authModalSlice.actions;

export default authModalSlice.reducer;
