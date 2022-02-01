import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchBithumbTicker, fetchPriceHistory } from '../Api';
import CoinTable from '../Components/CoinTable';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useTable } from 'react-table';

const Symbol = styled.td`
  display: flex;
  align-itemns: center;
`;
const Price = styled.td<{ isRaised: boolean }>`
  color: ${(props) => (props.isRaised ? '#e84118' : '#0097e6')};
`;
const Rate = styled.td<{ isRaised: boolean }>`
  color: ${(props) => (props.isRaised ? '#e84118' : '#0097e6')};
`;
const Value = styled.td``;

interface Iprops {
  initCoin: { symbol: string; closePrice: number; chgRate: number; value: number };
  symbol: string;
}
interface Iticker {
  symbol: string;
  closePrice: number;
  chgRate: number;
  value: number;
}

function CoinInfo(prop: Iprops) {
  //console.log('coinInfo');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { symbol, initCoin } = prop;

  const [coin, setCoin] = useState<Iticker>();

  // console.log(symbols, coins);
  //console.log(coins[`BTC_KRW`].closePrice);

  useEffect(() => {
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
          content: { symbol, closePrice, chgRate, value },
        } = data;
        //console.log(closePrice);

        setCoin({ symbol: symbol.slice(0, -4), closePrice, chgRate, value });

        setIsLoading(false);
      }
    };

    //

    return () => {
      websocket.close();
    };
  }, []);

  console.log();
  return (
    <div>
      {isLoading ? (
        <tr key={symbol}>
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
        </tr>
      ) : (
        <tr key={symbol}>
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
        </tr>
      )}
    </div>
  );
}

export default CoinInfo;
