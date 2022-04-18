import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CoinState {
  market: string;
  korean_name: string;
  english_name: string;
}
export interface ICoins {
  value: CoinState[];
}

const initialState: ICoins = {
  value: [] as CoinState[],
};

export const coinSearchSlice = createSlice({
  name: 'coinSearch',
  initialState,
  reducers: {
    setCoinSearchResult: (state, action: PayloadAction<CoinState[]>) => {
      state.value = [...action.payload];
    },
  },
});
export const { setCoinSearchResult } = coinSearchSlice.actions;
export default coinSearchSlice.reducer;
