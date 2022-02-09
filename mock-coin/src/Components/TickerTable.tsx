import styled from 'styled-components';
import { Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useMemo, useEffect, useState, useCallback } from 'react';

import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Iticker, coinListState, focusedCoin } from '../atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const CoinRow = styled.tr<{ isFocused: boolean }>`
  border: 3px solid ${(props) => (props.isFocused ? props.theme.accentColor : 'inherit')};
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;
const Symbol = styled.td`
  display: flex;
  align-itemns: center;
`;
const Price = styled.td<{ isRaised: boolean }>`
  color: ${(props) => (props.isRaised ? props.theme.red : props.theme.blue)};
`;
const Rate = styled.td<{ isRaised: boolean }>`
  color: ${(props) => (props.isRaised ? props.theme.red : props.theme.blue)};
`;
const Value = styled.td``;

interface Iprops {
  symbol: string;
}

function TickerTable() {
  //console.log('coinInfo');

  //const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coins, setCoins] = useRecoilState(coinListState);
  const { coinId } = useParams<{ coinId: string }>();
  const setFocusedCoin = useSetRecoilState(focusedCoin);
  console.log(coinId);
  //

  // console.log(symbols, coins);
  //console.log(coins[`BTC_KRW`].closePrice);

  useEffect(() => {
    const websocket = new W3CWebSocket('wss://pubwss.bithumb.com/pub/ws');

    websocket.onopen = () => {
      const msg = { type: 'ticker', symbols: Object.keys(coins).map((symbol) => `${symbol}_KRW`), tickTypes: ['24H'] };
      websocket.send(JSON.stringify(msg));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data.toString());
      //console.log(data);
      if (data?.type === 'ticker') {
        const {
          content: { symbol, closePrice, chgRate, value, lowPrice, highPrice, prevClosePrice, volume },
        } = data;
        //console.log(closePrice);

        setCoins((prev: any) => ({
          ...prev,
          [symbol.slice(0, -4)]: {
            symbol: symbol.slice(0, -4),
            closePrice,
            chgRate,
            value,
            lowPrice,
            highPrice,
            prevClosePrice,
            volume,
          },
        }));
        //console.log(data.content);
        //setIsLoading(false);
      }
    };

    //

    return () => {
      websocket.close();
    };
  }, []);

  console.log(coins);
  return (
    <>
      {Object.keys(coins).map((coin) => (
        <Link onClick={() => setFocusedCoin(coin)} to={`/${coin}`} key={coin}>
          <CoinRow isFocused={coinId === coin}>
            <Symbol>
              {' '}
              <img
                width="15px"
                height="15px"
                src={`https://cryptoicon-api.vercel.app/api/icon/${coin.toLowerCase()}`}
              />{' '}
              {coin}{' '}
            </Symbol>{' '}
            <Price isRaised={coins[coin]?.chgRate >= 0}>{Math.floor(coins[coin]?.closePrice).toLocaleString()} </Price>{' '}
            <Rate isRaised={coins[coin]?.chgRate >= 0}>
              {' '}
              {coins[coin]?.chgRate >= 0 ? `+${coins[coin]?.chgRate}` : coins[coin]?.chgRate}%{' '}
            </Rate>{' '}
            <Value> {Math.floor(coins[coin]?.value / 1000000)}백만 </Value>
          </CoinRow>
        </Link>
      ))}
    </>
  );
}

export default TickerTable;
