import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchBithumbTicker, fetchPriceHistory } from '../Api';
import CoinTable from '../Components/CoinTable';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
interface Itickers {
  opening_price: string;
  closing_price: string;
  min_price: string;
  max_price: string;
  units_traded: string;
  acc_trade_value: string;
  prev_closing_price: string;
  units_traded_24H: string;
  acc_trade_value_24H: string;
  fluctate_24H: string;
  fluctate_rate_24H: number;
  date: string;
}

//Itickers[]
//any 고치기

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
        <ul>
          <div>
            {initCoin?.symbol} {initCoin?.closePrice} {initCoin?.chgRate} {Math.floor(initCoin?.value / 1000000)}
          </div>
        </ul>
      ) : (
        <div>
          {coin?.symbol} {coin?.closePrice} {coin?.chgRate} {Math.floor((coin?.value || 0) / 1000000)}
        </div>
      )}
    </div>
  );
}

export default CoinInfo;
