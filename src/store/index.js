import { configureStore } from '@reduxjs/toolkit';
import configReducer from './configSlice';

const store = configureStore({
  reducer: {
    config: configReducer,
    // Add other reducers here if needed
  },
});

export default store;
