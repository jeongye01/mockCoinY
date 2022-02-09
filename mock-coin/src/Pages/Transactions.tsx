import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { focusedCoin } from '../atoms';
import { fetchOrderbook, fetchTransactions } from '../Api';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
//time 형태를 제한할 수 있도록 만들어 보기
interface Itransaction {
  transaction_date: string;
  type: 'bid' | 'ask';
  units_traded: number;
  price: number;
  total: number;
}

function Transactions() {
  const coinId = useRecoilValue(focusedCoin);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Itransaction[]>();

  useEffect(() => {
    console.log(coinId);
    fetchTransactions(coinId).then((result) => {
      setTransactions(result);
      setIsLoading(false);
    });
    //setIsLoading(false);

    //
  }, [coinId]); /*
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
        const {
          content: { list },
        } = data;
        let tmpArr: Itransaction[] = [];
        //any 고치기
        list.forEach((li: any) => {
          const { contDtm, buySellGb, contQty, contPrice, contAmt } = li;
          tmpArr = [
            ...tmpArr,
            {
              transaction_date: contDtm,
              type: buySellGb === 1 ? 'ask' : 'bid',
              units_traded: contQty,
              price: contPrice,
              total: contAmt,
            },
          ];
        });
        setTransactions((prev) => [...(prev || []), ...tmpArr].slice(-20));

        //console.log(data.content);
        //setIsLoading(false);
      }
    };

    console.log(transactions);

    return () => {
      websocket.close();
    };
  }, [transactions]);*/
  return (
    <>
      {isLoading ? (
        <h1>transactions</h1>
      ) : (
        <Container>
          {' '}
          {transactions?.map((transaction) => (
            <h1>
              {transaction?.transaction_date.slice(11, 19)} {Math.floor(transaction?.price).toLocaleString()}{' '}
              {`${Math.round(transaction?.units_traded * 10000) / 10000} ${coinId}`}
            </h1>
          ))}
        </Container>
      )}
    </>
  );
}

export default Transactions;
