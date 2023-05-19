import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  defaultAds: { ads: [], limit: 0 },
  specialAds: { ads: [], limit: 0 },
};

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setAds: (state, action) => {
      let ads = {
        defaultAds: action.payload.defaultAds,
        specialAds: action.payload.specialAds,
      };
      state.ads = ads;
    },
  },
});

export const { setAds } = adsSlice.actions;

export default adsSlice.reducer;
