import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { focusedCoin } from '../atoms';
import { fetchOrderbook, fetchTransactions } from '../Api';
import styled from 'styled-components';

const Container = styled.div`
  width: 290px;
  background-color: ${(props) => props.theme.panelColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 15px;
`;
const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  white-space: nowrap;
  tbody {
    overflow-y: scroll;
    //display: block;
    height: 580px;
    display: flex;
    flex-direction: column-reverse;
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.lineColor};
      height: 5px;
    }
    &::-webkit-scrollbar {
      opacity: 0;
      width: 2px;
    }
  }
  tr {
    display: flex;
    width: 100%;
    padding: 10px;
  }

  thead th {
    opacity: 0.7;
    border-top: 1px solid ${(props) => props.theme.lineColor};
    padding: 10px 0;
    border-bottom: 1px solid ${(props) => props.theme.lineColor};
  }
  tbody tr {
    &:hover {
      background-color: ${(props) => props.theme.accentColor};
    }
  }
  thead th,
  tbody td {
    text-align: end;
  }
  thead th:nth-child(1),
  tbody td:nth-child(1) {
    width: 33%;
    text-align: start;
  }

  thead th:nth-child(2),
  tbody td:nth-child(2) {
    width: 33%;
  }

  thead th:last-child,
  tbody td:last-child {
    width: 33%;
  }
`;

const ColorCol = styled.td<{ type: string }>`
  color: ${(props) => (props.type === 'bid' ? props.theme.red : props.theme.blue)};
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
          <Table>
            <thead>
              <tr>
                <th>체결시간</th>
                <th>가격</th>
                <th>수량</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr>
                  <td>{transaction?.transaction_date.slice(11, 19)}</td>
                  <ColorCol type={transaction.type}>{Math.floor(transaction?.price).toLocaleString()}</ColorCol>
                  <ColorCol type={transaction.type}>{`${
                    Math.round(transaction?.units_traded * 10000) / 10000
                  }`}</ColorCol>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}

export default Transactions;
