import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import ads from './slice/ad';
import bookmarks from './slice/bookmark';
import categories from './slice/category';
import compare from './slice/compare';
import user from './slice/user';
const combinedReducer = combineReducers({
  user,
  bookmarks,
  compare,
  categories,
  ads,
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
      ads: {
        ads: [...action.payload.ads.ads, ...state.ads.ads],
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
