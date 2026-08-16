import { createSlice } from '@reduxjs/toolkit';

type LoadingState = {
  isLoading: boolean;
};

type Loading = {
    isLoading: boolean 
};

const initialState = {
  isLoading: true
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state: LoadingState, action: { payload: Loading }) => {
      const { isLoading } = action.payload;
      
      state.isLoading = isLoading;
    },
  },
});

export const { 
    setLoading 
} = loadingSlice.actions;

export default loadingSlice.reducer;