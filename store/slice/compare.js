import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  compare: [],
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setCompare: (state, action) => {
      state.compare = [...state.compare, action.payload];
    },
    clearCompare: (state) => {
      state.compare = [];
    },
    updateCompare: (state, action) => {
      state.compare = action.payload;
    },
  },
});

export const { setCompare, clearCompare, updateCompare } = compareSlice.actions;

export default compareSlice.reducer;
