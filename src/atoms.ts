import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

export interface Iticker {
  symbol: string;
  closePrice: number;
  chgRate: number;
  value: number;
  lowPrice: number;
  highPrice: number;
  prevClosePrice: number;
  volume: number;
}
//any 고치기

export const coinListState = atom<any>({
  key: 'coins',
  default: {},
});
export const focusedCoin = atom<string>({
  key: 'focused',
  default: 'BTC',
});

interface IholdingCoin {
  name: string;
  holdingQuantity: number;
  coinYield: number;
}
