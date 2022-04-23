import { useEffect, useState } from 'react';

import { w3cwebsocket as W3CWebSocket } from 'websocket';
import moment from 'moment-timezone';
import { fetchTransactions } from '../Api';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
const Container = styled.div`
  width: 290px;
  background-color: ${(props) => props.theme.panelColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 15px;
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
    width: 33%;

    text-align: center;
  }
  div:nth-child(2) {
    width: 33%;
    text-align: center;
  }
  div:last-child {
    width: 33%;
    text-align: end;
  }
`;
const Row = styled.div<{ tradeType: 'ASK' | 'BID' }>`
  border-top: 1px solid ${(props) => props.theme.panelColor};
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ theme, tradeType }) => (tradeType === 'ASK' ? theme.blue : theme.red)};
  padding: 0px 13px;

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33%;
    height: 32px;
    text-align: center;
    font-size: 16px;
    background-color: ${({ tradeType }) => (tradeType === 'ASK' ? '#ecf3fa' : '#FBF1EF')};
  }
  div:nth-child(2) {
    width: 33%;
    text-align: end;
    font-size: 14px;
  }
  div:last-child {
    width: 33%;
    text-align: end;
    font-size: 14px;
  }
`;

//time 형태를 제한할 수 있도록 만들어 보기
interface ITrade {
  trade_price: number; //체결 가격
  trade_volume: number; //체결 수량
  ask_bid: 'ASK' | 'BID'; //체결 타입
  trade_time: string; //체결시간 HH:mm:ss
  trade_timestamp: number;
}

function Trade() {
  const { coinId } = useParams<{ coinId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [trades, setTrades] = useState<ITrade[]>([]);

  useEffect(() => {
    if (!coinId) return;
    setLoading(true);
    setTrades([]);
    const websocket = new WebSocket('wss://api.upbit.com/websocket/v1');
    websocket.onopen = (e) => {
      const id = uuidv4();

      websocket.send(JSON.stringify([{ ticket: id }, { type: 'trade', codes: [coinId], isOnlySnapshot: true }]));
    }; //[{ ticket: id }, { type: 'ticker', codes,isOnlySnapshot:true }]
    websocket.onmessage = async (event) => {
      try {
        const { data } = event;
        console.log(event);
        const text = await new Response(data).text();

        console.log(text);
        setTrades((prev) => {
          //늦게 온게 앞에 위치하도록 배치
          if (prev.length > 25) {
            return [JSON.parse(text), ...prev.slice(0, -1)];
          } else {
            return [JSON.parse(text), ...prev];
          }
        });
        setLoading(false);
      } catch {}
    };
    return () => {
      websocket.close();
    };
  }, [coinId]);
  console.log(trades);

  return (
    <>
      {loading ? (
        <h1>transactions</h1>
      ) : (
        <Container>
          <TableHead>
            <div>체결시간</div>
            <div>가격</div>
            <div>수량</div>
          </TableHead>
          <Table>
            {trades?.map((trade) => (
              <Row tradeType={trade?.ask_bid}>
                <div>{moment.tz(trade?.trade_timestamp, 'Asia/Seoul').format().slice(11, 19)}</div>
                <div>{trade?.trade_price.toLocaleString()}</div>
                <div>{trade?.trade_volume.toFixed(4)}</div>
              </Row>
            ))}
          </Table>
        </Container>
      )}
    </>
  );
}

export default Trade;
