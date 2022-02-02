import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
interface RouteState {
  volume: number;
  lowPrice: number;
  highPrice: number;
  closePrice: number;
  prevClosePrice: number;
  chgRate: number;
  value: number;
}

function CoinOutline() {
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation<RouteState>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coin, setCoin] = useState<RouteState>();
  console.log(coinId);
  useEffect(() => {
    const websocket = new W3CWebSocket('wss://pubwss.bithumb.com/pub/ws');

    websocket.onopen = () => {
      const msg = { type: 'ticker', symbols: [`${coinId}_KRW`], tickTypes: ['24H'] };
      websocket.send(JSON.stringify(msg));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data.toString());
      //console.log(data);
      if (data?.type === 'ticker') {
        const {
          content: { volume, lowPrice, highPrice, closePrice, prevClosePrice, chgRate, value },
        } = data;
        //console.log(closePrice);

        setCoin({
          volume,
          lowPrice,
          highPrice,
          closePrice,
          prevClosePrice,
          chgRate,
          value,
        });

        setIsLoading(false);
      }
    };

    //

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <div>
            {' '}
            <img
              width="15px"
              height="15px"
              src={`https://cryptoicon-api.vercel.app/api/icon/${coinId.toLowerCase()}`}
            />{' '}
            {coinId}{' '}
          </div>{' '}
          <div>{Math.floor(state?.closePrice).toLocaleString()} </div>{' '}
          <div> {state?.chgRate >= 0 ? `+${state?.chgRate}` : state?.chgRate}% </div>{' '}
          <div> {Math.floor(state?.value / 1000000)}백만 </div>
        </div>
      ) : (
        <div>
          <div>
            <img
              width="15px"
              height="15px"
              src={`https://cryptoicon-api.vercel.app/api/icon/${coinId.toLowerCase()}`}
            />{' '}
            {coinId}{' '}
          </div>
          <div>{Math.floor(coin?.closePrice || 0).toLocaleString()} </div>
          <div> {(coin?.chgRate || 0) >= 0 ? `+${coin?.chgRate}` : coin?.chgRate}% </div>
          <div> {Math.floor((coin?.value || 0) / 1000000)}백만</div>
        </div>
      )}
    </div>
  );
}

export default CoinOutline;
