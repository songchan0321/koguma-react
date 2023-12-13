import { configureStore, createSlice } from "@reduxjs/toolkit";

const club = createSlice({
  name: "club",
  initialState: { id: null },
  reducers: {
    changeClubId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { changeClubId } = club.actions;

export default configureStore({
  reducer: {
    club: club.reducer,
  },
});
