import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCrypto: 'BTC',
  cryptoData: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setCryptoData: (state, action) => {
      state.cryptoData = action.payload;
    },
  },
});

export const { setSelectedCrypto, setCryptoData } = cryptoSlice.actions;

export default cryptoSlice.reducer;
