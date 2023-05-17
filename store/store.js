import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import bookmarks from './slice/bookmark';
import compare from './slice/compare';
import user from './slice/user';
const combinedReducer = combineReducers({
  user,
  bookmarks,
  compare,
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
