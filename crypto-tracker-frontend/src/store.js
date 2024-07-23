import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './features/cryptoSlice';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export default store;
