import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TickerState {
  code: string; //마켓코드
  korean_name: string; //한글 이름
  trade_price: number; //현재 가격
  change: 'RISE' | 'EVEN' | 'FALL'; //전일 대비
  signed_change_price: number; //전일 대비 값
  signed_change_rate: number; //전일대비 등락률
  acc_trade_price_24h: number; //24시간 누적 거래대금
}
export interface ITickers {
  value: { [key: string]: TickerState };
}

const initialState: ITickers = {
  value: {},
};

export const tickerListSlice = createSlice({
  name: 'tickerList',
  initialState,
  reducers: {
    updateTickers: (state, action: PayloadAction<TickerState>) => {
      const { code, korean_name, trade_price, change, signed_change_price, signed_change_rate, acc_trade_price_24h } =
        action.payload;
      state.value = {
        ...state.value,
        [code]: {
          code,
          korean_name,
          trade_price,
          change,
          signed_change_price,
          signed_change_rate,
          acc_trade_price_24h,
        },
      };
    },
  },
});
export const { updateTickers } = tickerListSlice.actions;
export default tickerListSlice.reducer;
