import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.upbit.com/v1',
});

export const getCoinList = async () => {
  return instance.get('/market/all').then((response) => response.data);
};

/*

{market} = 결제 통화(마켓), 기본값 : KRW

{interval} = 차트 간격, 기본값 : 24h {1m, 3m, 5m, 10m, 30m, 1h, 6h, 12h, 24h 사용 가능}
{count}interval분 봉을  몇개 가져올지  200개 까지 요청 가능 
*/
export async function getCandlestick(market: string, path: string, unit?: number) {
  if (!unit) {
    return instance.get(`/candles/${path}?market=${market}&count=100`).then((response) => response.data);
  } else {
    return instance.get(`/candles/${path}/${unit}?market=${market}&count=80`).then((response) => response.data);
  }
}

const bithumb = axios.create({
  baseURL: 'https://api.bithumb.com/public',
});

export async function fetchOrderbook(order_currency: string) {
  try {
    console.log(order_currency);
    const response = await bithumb.get(`/orderbook/XRP_KRW`);
    const { data } = response;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function fetchTransactions(order_currency: string) {
  try {
    console.log(order_currency);
    const response = await bithumb.get(`/transaction_history/${order_currency}_KRW`);
    const { data } = response;

    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
