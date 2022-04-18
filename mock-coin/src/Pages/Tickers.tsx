import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { fetchBithumbTickers, getCoinList } from '../Api';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Iticker, coinListState } from '../atoms';
import TickerTable from '../Components/TickerTable';
import { updateTickers } from '../tickerListSlice';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useTable } from 'react-table';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { setCoinList, CoinState } from '../coinListSlice';
import TradePrice from '../Components/TradePrice';
import Search from './Search';
//,Acc,Rate
interface ICoinRow {
  isFocused: boolean;
  change: 'RISE' | 'EVEN' | 'FALL';
}

const CoinRow = styled.div<ICoinRow>`
  /*border: 3px solid ${(props) => (props.isFocused ? props.theme.accentColor : 'inherit')};
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }*/
  border-top: 1px solid ${(props) => props.theme.lightGray};
  display: flex;
  align-items: start;
  width: 100%;
  font-size: 12px;
  padding: 6px 13px;
  background-color: ${(props) => (props.isFocused ? props.theme.lightGray : 'inherit')};
  &:hover {
    background-color: ${(props) => props.theme.lightGray};
  }

  div:first-child {
    width: 10%;
    font-size: 20px;
    color: lightgray;
  }
  div:nth-child(2) {
    width: 30%;
    display: flex;
    flex-direction: column;

    span {
      width: 90%;
    }
    span:first-child {
      margin-bottom: 3px;
      font-weight: 600;
    }
  }
  div:nth-child(3) {
    width: 20%;
    text-align: end;
    font-weight: 600;
    color: ${(props) =>
      props.change === 'EVEN' ? 'black' : `${props.change === 'RISE' ? props.theme.red : props.theme.blue}`};
  }
  div:nth-child(4) {
    width: 20%;
    display: flex;
    flex-direction: column;
    text-align: end;
    color: ${(props) =>
      props.change === 'EVEN' ? 'black' : `${props.change === 'RISE' ? props.theme.red : props.theme.blue}`};
  }
  div:last-child {
    width: 20%;
    text-align: end;
  }
`;

const Table = styled.div`
  display: flex;
  height: 620px;
  flex-direction: column;
  width: 100%;
  height: 600px;
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

interface Iprops {
  symbol: string;
}
const TableHead = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.lightGray};
  padding: 6px 13px;
  div {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.5;
  }
  div:first-child {
    width: 10%;
  }
  div:nth-child(2) {
    width: 30%;
    text-align: start;
  }
  div:nth-child(3) {
    width: 20%;
    text-align: center;
  }
  div:nth-child(4) {
    width: 20%;
    text-align: end;
  }
  div:last-child {
    width: 20%;
    text-align: end;
  }
`;
const Container = styled.div`
  width: 400px;
  min-width: 400px;
  max-width: 400px;

  background-color: ${(props) => props.theme.panelColor};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

//Itickers[]
//any 고치기

function Tickers() {
  // const [searchTerm, setSearchTerm] = useState<string>('');
  const tickerList = useSelector((state: RootState) => state.tickerList);
  const coinList = useSelector((state: RootState) => state.coinList);
  const dispatch = useDispatch();
  const { coinId: coinOnUrl } = useParams<{ coinId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const coinSearchResult = useSelector((state: RootState) => state.coinSearchResult);
  // const [coinList, setCoinList] = useState<ICoin[]>();
  useEffect(() => {
    const getCoins = async () => await getCoinList();
    getCoins().then((data: CoinState[]) => {
      if (data) {
        const krwCoins = data.filter((coin) => coin.market.split('-')[0] === 'KRW');
        dispatch(setCoinList(krwCoins));
      }
    });
  }, []);
  useEffect(() => {
    if (!coinList) return;
    const websocket = new WebSocket('wss://api.upbit.com/websocket/v1');
    websocket.onopen = (e) => {
      console.log('connected', e);
      const id = uuidv4();
      const codes = coinList?.value?.map((coin) => coin.market);

      // const msg = { type: 'ticker', codes };
      websocket.send(JSON.stringify([{ ticket: id }, { type: 'ticker', codes, isOnlySnapshot: true }]));
    }; //[{ ticket: id }, { type: 'ticker', codes,isOnlySnapshot:true }]
    websocket.onmessage = async (event) => {
      const { data } = event;
      const text = await new Response(data).text();

      dispatch(updateTickers(JSON.parse(text)));
    };
    return () => {
      websocket.close();
    };
  }, [coinList]);

  /*

  */

  //console.log(coinList);
  //console.log(tickerList);
  return (
    <>
      {' '}
      {Object.keys(tickerList?.value)?.length !== coinList?.value?.length ? (
        'Loading...'
      ) : (
        <Container>
          <Search />
          <TableHead>
            <div></div>
            <div>한글명</div>
            <div>현재가</div>
            <div>전일대비</div>
            <div>거래대금</div>
          </TableHead>
          <Table>
            {coinSearchResult?.value?.map((coin, i) => {
              const { trade_price, change, signed_change_price, signed_change_rate, acc_trade_price_24h } =
                tickerList?.value?.[coin.market];

              return (
                <Link key={i} to={`/${coin.market}`}>
                  <CoinRow isFocused={coin.market === coinOnUrl} change={tickerList?.value?.[coin.market]?.change}>
                    <div>★</div>
                    <div>
                      <span>{coin.korean_name}</span>
                      <span>{coin.market}</span>
                    </div>
                    <TradePrice price={trade_price || 0} change={change || 'EVEN'} index={i} />

                    <div>
                      {(tickerList?.value?.[coin.market] && (
                        <>
                          <span>{(100 * tickerList?.value?.[coin.market].signed_change_rate).toFixed(2) || null}</span>
                          <span>{tickerList?.value?.[coin.market].signed_change_price.toLocaleString() || null}</span>
                        </>
                      )) ||
                        null}
                    </div>
                    <div>
                      {(tickerList?.value?.[coin.market] && (
                        <span>
                          {Math.round(
                            tickerList?.value?.[coin.market].acc_trade_price_24h / 1000000,
                          ).toLocaleString() || null}
                          백만
                        </span>
                      )) ||
                        null}
                    </div>
                  </CoinRow>
                </Link>
              );
            })}
          </Table>
        </Container>
      )}
    </>
  );
}

export default Tickers;

/*
interface PriceProps {
  price: number;
  change: 'RISE' | 'EVEN' | 'FALL';
}
function Price({ price, change }: PriceProps) {
  const [borderColor, setBorderColor] = useState<'red' | 'blue' | 'none'>('none');
  useEffect(() => {
    if (change === 'RISE') {
      setBorderColor('red');
    } else if (change === 'FALL') {
      setBorderColor('blue');
    } else {
      setBorderColor('none');
    }
  }, [price]);
  console.log(borderColor);
  return (
    <PriceContainer price={price} borderColor={borderColor}>
      {price || null}
    </PriceContainer>
  );
}

React.memo(Price);
/*

 <Table>
            <thead>
              <tr>
                <th>코인명</th>
                <th>가격</th>
                <th>등락률</th>
                <th>거래대금</th>
              </tr>
            </thead>
            <tbody>
              <TickerTable />
            </tbody>
          </Table>

 */

/*
          
          
          const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;

  font-size: 14px;
  white-space: nowrap;
  tbody {
    overflow-y: scroll;
    display: block;
    height: 580px;

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
    width: 20%;
    text-align: start;
  }

  thead th:nth-child(2),
  tbody td:nth-child(2) {
    width: 30%;
  }

  thead th:nth-child(3),
  tbody td:nth-child(3) {
    width: 25%;
  }

  thead th:last-child,
  tbody td:last-child {
    width: 25%;
  }
`;

          
          */
