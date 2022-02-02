import styled from 'styled-components';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchBithumbTicker, fetchPriceHistory } from '../../Api';

import { w3cwebsocket as W3CWebSocket } from 'websocket';

const CoinRow = styled.tr<{ isFocused: boolean }>`
  border: 3px solid ${(props) => (props.isFocused ? props.theme.accentColor : 'inherit')};
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

interface Iticker {
  symbol: string;
  closePrice: number;
  chgRate: number;
  value: number;
  lowPrice: number;
  highPrice: number;
  prevClosePrice: number;
  volume: number;
}
interface Iprops {
  initCoin: Iticker;
  symbol: string;
}

function CoinInfo(prop: Iprops) {
  //console.log('coinInfo');
  const { coinId } = useParams<{ coinId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { initCoin, symbol } = prop;
  const isActive = useRouteMatch(`/${symbol}`);

  const [coin, setCoin] = useState<Iticker>();

  // console.log(symbols, coins);
  //console.log(coins[`BTC_KRW`].closePrice);

  useEffect(() => {
    /*
    const websocket = new W3CWebSocket('wss://pubwss.bithumb.com/pub/ws');

    websocket.onopen = () => {
      const msg = { type: 'ticker', symbols: [`${symbol}_KRW`], tickTypes: ['24H'] };
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

        setCoin({
          symbol: symbol.slice(0, -4),
          closePrice,
          chgRate,
          value,
          lowPrice,
          highPrice,
          prevClosePrice,
          volume,
        });

        setIsLoading(false);
      }
    };

    //

    return () => {
      websocket.close();
    };*/
  }, []);

  console.log();
  return (
    <div>
      {isLoading ? (
        <Link
          to={{
            pathname: `/${symbol}`,
            state: {
              volume: initCoin?.value,
              lowPrice: initCoin?.lowPrice,
              highPrice: initCoin?.highPrice,
              closePrice: initCoin?.closePrice,
              prevClosePrice: initCoin?.prevClosePrice,
              chgRate: initCoin?.chgRate,
              value: initCoin?.value,
            },
          }}
        >
          <CoinRow isFocused={isActive !== null}>
            <Symbol>
              {' '}
              <img
                width="15px"
                height="15px"
                src={`https://cryptoicon-api.vercel.app/api/icon/${initCoin.symbol.toLowerCase()}`}
              />{' '}
              {initCoin?.symbol}{' '}
            </Symbol>{' '}
            <Price isRaised={initCoin?.chgRate >= 0}>{Math.floor(initCoin?.closePrice).toLocaleString()} </Price>{' '}
            <Rate isRaised={initCoin?.chgRate >= 0}>
              {' '}
              {initCoin?.chgRate >= 0 ? `+${initCoin?.chgRate}` : initCoin?.chgRate}%{' '}
            </Rate>{' '}
            <Value> {Math.floor(initCoin?.value / 1000000)}백만 </Value>
          </CoinRow>
        </Link>
      ) : (
        <Link
          to={{
            pathname: `/${symbol}`,
            state: {
              volume: coin?.value,
              lowPrice: coin?.lowPrice,
              highPrice: coin?.highPrice,
              closePrice: coin?.closePrice,
              prevClosePrice: coin?.prevClosePrice,
              chgRate: coin?.chgRate,
              value: coin?.value,
            },
          }}
        >
          <CoinRow isFocused={isActive !== null}>
            <Symbol>
              <img
                width="15px"
                height="15px"
                src={`https://cryptoicon-api.vercel.app/api/icon/${initCoin.symbol.toLowerCase()}`}
              />{' '}
              {coin?.symbol}{' '}
            </Symbol>
            <Price isRaised={(coin?.chgRate || 0) >= 0}>{Math.floor(coin?.closePrice || 0).toLocaleString()} </Price>
            <Rate isRaised={(coin?.chgRate || 0) >= 0}>
              {' '}
              {(coin?.chgRate || 0) >= 0 ? `+${coin?.chgRate}` : coin?.chgRate}%{' '}
            </Rate>
            <Value> {Math.floor((coin?.value || 0) / 1000000)}백만</Value>
          </CoinRow>
        </Link>
      )}
      {coinId === symbol ? <h1>hello</h1> : null}
    </div>
  );
}

export default CoinInfo;
