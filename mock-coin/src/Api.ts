import axios from 'axios';

const coinPaprika = axios.create({
  baseURL: 'https://api.coinpaprika.com/v1',
});

const bithumb = axios.create({
  baseURL: 'https://api.bithumb.com/public',
});
/*
export function fetchCoins() {
  return instance.get('/coins?quotes=KRW').then((response) => response.data);
}
*/
//비트썸
export function fetchBithumbTickers() {
  return bithumb.get('/ticker/ALL_KRW').then((response) => response.data);
}

//coinPaprika
export function fetchPaprikaTickers() {
  return coinPaprika.get(`/tickers?quotes=KRW`).then((response) => response.data);
}
/*
export function fetchOneTicker(coin: string) {
  return instance.get(`/ticker/${coin}_KRW`).then((response) => response.data);
}

export const fecthMajorCoins = async () => {
  const tickers = await fetchTickers();
  const majorCoins = Object.keys(tickers.data).slice(0, 7);
  const ret = await majorCoins.map(async (coin) => await fetchOneTicker(coin));
  return ret;
};

export function fetchCoinInfo(coinId: string) {
  return instance.get(`/coins/${coinId}?quotes=KRW`).then((response) => response.data);
}

export function fetchCoinTickers(coinId: string) {
  return instance.get(`/tickers/${coinId}?quotes=KRW`).then((response) => response.data);
}

*/
