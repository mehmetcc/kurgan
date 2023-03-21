import { configureStore } from '@reduxjs/toolkit';

import locationReducer from './LocationSlice';

const store = configureStore({
    reducer: {
        location: locationReducer
    }
  })
  
export default store;

export type RootState = ReturnType<typeof store.getState>;
