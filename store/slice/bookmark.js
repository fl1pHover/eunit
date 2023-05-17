import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarks: [],
};

export const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmark: (state, action) => {
      if (state.bookmarks.includes(action.payload)) {
        state.bookmarks = state.bookmarks.filter(
          (bookmark) => bookmark !== action.payload
        );
      } else {
        state.bookmarks = [...state.bookmarks, action.payload];
      }
    },
  },
});

export const { setBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
