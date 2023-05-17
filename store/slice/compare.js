import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  compare: [],
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setCompare: (state, action) => {
      if (state.compare.includes(action.payload)) {
        state.compare = state.compare.filter((com) => com !== action.payload);
      } else {
        state.compare = [...state.compare, action.payload];
      }
    },
  },
});

export const { setCompare } = compareSlice.actions;

export default compareSlice.reducer;
