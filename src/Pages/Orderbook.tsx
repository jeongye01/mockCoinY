import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
  width: 380px;
  min-width: 380px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.panelColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 15px;
  font-size: 14px;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 630px;
  min-height: 630px;
  overflow-y: scroll;

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.lineColor};
    height: 5px;
  }
  &::-webkit-scrollbar {
    opacity: 0;
    width: 2px;
  }
`;

const TableHead = styled.div`
  display: flex;
  width: 100%;
  opacity: 0.3;
  font-weight: 600;

  padding: 13px;
  font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;

    text-align: center;
  }
  div:nth-child(2) {
    width: 30%;
    text-align: end;
  }
  div:last-child {
    width: 40%;
    text-align: end;
  }
`;
const Row = styled.div<{ isAsk: boolean }>`
  border-top: 1px solid ${(props) => props.theme.panelColor};
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ theme, isAsk }) => (isAsk ? theme.blue : theme.red)};
  padding: 0px 13px;

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 32px;
    text-align: center;
    font-size: 16px;
    background-color: ${({ isAsk }) => (isAsk ? '#ecf3fa' : '#FBF1EF')};
  }
  div:nth-child(2) {
    width: 30%;
    text-align: end;
    font-size: 14px;
  }
  div:last-child {
    width: 40%;
    text-align: end;
    font-size: 14px;
  }
`;
interface IOrderBook {
  ask_price: number;
  ask_size: number;
  ask_acc: number; //누적 수량
  bid_price: number;
  bid_size: number;
  bid_acc: number; //누적수량
}

function Orderbook() {
  const { coinId } = useParams<{ coinId: string }>();
  const [orderBooks, setOrderBooks] = useState<IOrderBook[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!coinId) return;
    setLoading(true);

    const websocket = new WebSocket('wss://api.upbit.com/websocket/v1');
    websocket.onopen = (e) => {
      const id = uuidv4();
      console.log(e, coinId);
      websocket.send(JSON.stringify([{ ticket: id }, { type: 'orderbook', codes: [coinId], isOnlySnapshot: true }]));
    }; //[{ ticket: id }, { type: 'ticker', codes,isOnlySnapshot:true }]
    websocket.onmessage = async (event) => {
      try {
        const { data } = event;

        const text = await new Response(data).text();
        const json: IOrderBook[] = JSON.parse(text).orderbook_units;
        let ask_sum: number = 0;
        let bid_sum: number = 0;
        const result = json.map((ob) => {
          ask_sum += ob.ask_size;
          bid_sum += ob.bid_size;
          return { ...ob, bid_acc: bid_sum, ask_acc: ask_sum };
        });
        setOrderBooks(result);
        setLoading(false);
      } catch {}
    };
    return () => {
      websocket.close();
    };
  }, [coinId]);

  return (
    <>
      {loading ? (
        <>hello</>
      ) : (
        <Container>
          <TableHead>
            <div>호가</div>
            <div>수량</div>
            <div>누적수량</div>
          </TableHead>
          <Table>
            <>
              {orderBooks?.reverse().map((order, index) => (
                <Row key={index} isAsk={true}>
                  <div>{order?.ask_price}</div>
                  <div>{order?.ask_size?.toFixed(4)}</div>
                  <div>{order?.ask_acc?.toFixed(4)}</div>
                </Row>
              ))}
            </>
            <>
              {orderBooks?.reverse()?.map((order, index) => (
                <Row key={index} isAsk={false}>
                  <div>{order?.bid_price}</div>
                  <div>{order?.bid_size.toFixed(4)}</div>
                  <div>{order?.bid_acc?.toFixed(4)}</div>
                </Row>
              ))}
            </>
          </Table>
        </Container>
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
