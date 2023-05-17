import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import bookmarks from "./slice/bookmark";
import compare from "./slice/compare";
import user from "./slice/user";
import categories from "./slice/category";
const combinedReducer = combineReducers({
  user,
  bookmarks,
  compare,
  categories,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,

      user: {
        user: [...action.payload.user.user, ...state.user.user],
      },
      bookmarks: {
        bookmarks: [
          ...action.payload.bookmarks.bookmarks,
          ...state.bookmarks.bookmarks,
        ],
      },

      compare: {
        compare: [...action.payload.compare.compare, ...state.compare.compare],
      },
      categories: {
        categories: [
          ...action.payload.categories.categories,
          ...state.categories.categories,
        ],
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore(
    {
      reducer: masterReducer,
    },
    { devTools: true }
  );

export const wrapper = createWrapper(makeStore, { debug: true });
