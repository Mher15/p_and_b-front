import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploaderState {
  selectedFile: string;
  previewOpen: boolean;
  previewImage: string;
}

const initialState: UploaderState = {
  selectedFile: "",
  previewImage: "",
  previewOpen: false,
};

const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {
    setSelectedFile(state, action: PayloadAction<string>) {
      state.selectedFile = action.payload;
    },
    setPreviewOpen(state, action: PayloadAction<boolean>) {
      state.previewOpen = action.payload;
    },
    setPreviewImage(state, action: PayloadAction<string>) {
      state.previewImage = action.payload;
    },
  },
});

export const { setSelectedFile, setPreviewOpen, setPreviewImage } =
  uploaderSlice.actions;
export default uploaderSlice.reducer;
