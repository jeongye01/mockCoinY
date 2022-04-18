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

export const coinListSlice = createSlice({
  name: 'coinList',
  initialState,
  reducers: {
    setCoinList: (state, action: PayloadAction<CoinState[]>) => {
      state.value = [...action.payload];
    },
  },
});
export const { setCoinList } = coinListSlice.actions;
export default coinListSlice.reducer;
