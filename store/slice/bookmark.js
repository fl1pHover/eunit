import urls from "@/constants/api";
import { updateBookmarks } from "@/context/functions";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next";

const initialState = {
  bookmarks: [],
};

export const bookmarkSlice = createSlice({
  name: "bookmarks",
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
    updateBookmark: (state, action) => {
      state.bookmarks = action.payload;
      
    },
  },
});

export const { setBookmark, updateBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
