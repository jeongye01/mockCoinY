import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { focusedCoin } from '../atoms';
import { fetchOrderbook, fetchTransactions } from '../Api';

function Orderbook() {
  const coinId = useRecoilValue(focusedCoin);
  const [transactions, setTransactions] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    console.log(coinId);
    fetchOrderbook(coinId).then((result) => console.log(result));
    //setIsLoading(false);

    //
  }, [coinId]);
  //console.log(transactions);
  return (
    <>
      {isLoading ? (
        <>hello</>
      ) : (
        <h1>
          {transactions?.map((transaction: any) => (
            <h1>{transaction.contDtm}</h1>
          ))}
        </h1>
      )}
    </>
  );
}

export default Orderbook;

/*function OrderbookDepth() {
  const coinId = useRecoilValue(focusedCoin);
  const [transactions, setTransactions] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const websocket = new W3CWebSocket('wss://pubwss.bithumb.com/pub/ws');

    websocket.onopen = () => {
      const msg = { type: 'transaction', symbols: [`${coinId}_KRW`] };
      websocket.send(JSON.stringify(msg));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data.toString());
      //console.log(data);
      if (data?.type === 'transaction') {
        console.log(data);
        const {
          content: { list },
        } = data;
        setTransactions((prev: any) =>
          (prev
            ? [...prev, ...list].length >= 30
              ? [...prev, ...list].slice(-30, -1)
              : [...prev, ...list]
            : [...list]
          ).reverse(),
        );
        setIsLoading(false);
      }
    };

    //

    return () => {
      websocket.close();
    };
  }, [coinId]);
  console.log(transactions);
  return (
    <>
      {isLoading ? (
        <>hello</>
      ) : (
        <h1>
          {transactions?.map((transaction: any) => (
            <h1>{transaction.contDtm}</h1>
          ))}
        </h1>
      )}
    </>
  );
}

export default OrderbookDepth;
*/
