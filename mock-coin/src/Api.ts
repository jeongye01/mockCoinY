import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.upbit.com/v1',
});

export const getCoinList = async () => {
  return instance.get('/market/all').then((response) => response.data);
};

const bithumb = axios.create({
  baseURL: 'https://api.bithumb.com/public',
});

//비트썸
export function fetchBithumbTickers() {
  return bithumb.get('/ticker/ALL_KRW').then((response) => response.data);
}

/*{order_currency} = 주문 통화(코인), 기본값 : BTC

{payment_currency} = 결제 통화(마켓), 기본값 : KRW

{chart_intervals} = 차트 간격, 기본값 : 24h {1m, 3m, 5m, 10m, 30m, 1h, 6h, 12h, 24h 사용 가능}
*/
export async function fetchCandlestick(order_currency: string, chart_intervals: string) {
  try {
    const response = await bithumb.get(`/candlestick/${order_currency}_KRW/${chart_intervals}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

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
