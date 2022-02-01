import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { fetchBithumbTickers, fetchPriceHistory, fetchBithumbTicker } from '../Api';
import CoinInfo from '../Components/CoinInfo';
import CoinTable from '../Components/CoinTable';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { convertTypeAcquisitionFromJson, SymbolDisplayPartKind } from 'typescript';
const Container = styled.div`
  padding: 0px 30px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  color: ${(props) => props.theme.accentColor};
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
`;
const CoinList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  li {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    width: 100%;
    border-radius: 15px;
    margin-bottom: 10px;
    padding: 15px;
    a {
      display: flex;
      align-items: center;

      transition: color 0.2s ease-in-out;
      img {
        margin-right: 5px;
      }
      &:hover {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;
const Tickers = styled.div`
  width: 385px;
  padding: 10px;
`;

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

interface Idata {
  name: string;
  closePrice: any;
  chgRate: any;
  value: any;
}

interface Iticker {
  symbol: string;
  closePrice: number;
  chgRate: number;
  value: number;
}
//Itickers[]
//any 고치기
function Home() {
  const [initCoins, setInitCoins] = useState<Iticker[]>();
  const [isLoading, setIsLoading] = useState(true);
  const columns = useMemo(
    () => [
      {
        Header: '코인명',
        accessor: 'symbol',
      },

      {
        Header: '가격',
        accessor: 'closePrice',
      },
      {
        Header: '등락률',
        accessor: ' chgRate',
      },

      {
        Header: '거래량',
        accessor: 'value',
      },
    ],
    [],
  );
  useEffect(() => {
    fetchBithumbTickers().then((result) => {
      const { data: tickers } = result;
      const symbols = Object.keys(tickers).slice(0, 100);
      let tmpArr: Iticker[] = [];
      symbols?.forEach((symbol) => {
        const { closing_price, fluctate_rate_24H, acc_trade_value_24H } = tickers[symbol];

        tmpArr.push({
          symbol,
          closePrice: closing_price,
          chgRate: fluctate_rate_24H,
          value: acc_trade_value_24H,
        });
      });

      setInitCoins(tmpArr);
      setIsLoading(false);
    });
  }, []);

  console.log(initCoins);
  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <div>
          <Tickers>
            <div>
              <span>코인명</span>
              <span>가격</span>
              <span>등락률</span>
              <span>거래대금</span>
            </div>
            {initCoins?.map((coin: any, i: any) => (
              <li key={i}>
                <CoinInfo symbol={coin.symbol} initCoin={coin} />
              </li>
            ))}
          </Tickers>
        </div>
      )}
    </>
  );
}

export default Home;
/*

 //syms = syms.map((symbol) => `${symbol}_KRW`);
      let infos: Idata[] = [];
      syms.forEach((sym) => {
        const { closing_price, fluctate_rate_24H, units_traded_24H } = tickers.data[sym];
        infos.push({ name: sym, closePrice: closing_price, chgRate: fluctate_rate_24H, value: units_traded_24H });
        setCoins(infos);
      });
  
  const [trigger, setTrigger] = useState<boolean>(false);
  useEffect(() => {
    console.log('coin Upadated');
    setMajorCoins(Object.keys(coins.data).slice(0, 10));
    setTrigger(!trigger);
    console.log(majorCoinsInfo);
  }, [coins]);
  useEffect(() => {
    let infos: Idata[] = [];
    majorCoins?.forEach((symbol) => {
      fetchPriceHistory(symbol).then((result) => {
        const { fluctate_rate_24H, units_traded_24H } = coins.data[symbol];
        const { price } = result.data.slice(-1)[0];
        console.log(result.data);
        infos.push({ name: symbol, price: Math.floor(price), fluctate_rate_24H, units_traded_24H });
        if (infos.length === 10) setMajorCoinsInfo(infos);
      });
    });

    //setMajorCoinsInfo(infos);
  }, [trigger]);

  const columns = useMemo(
    () => [
      {
        Header: '코인',
        accessor: 'name',
      },

      {
        Header: '가격',
        accessor: 'price',
      },
      {
        Header: '등락률',
        accessor: ' fluctate_rate_24H',
      },

      {
        Header: '거래량',
        accessor: 'units_traded_24H',
      },
    ],
    [],
  );
  return (
    <Container>
      <Header>
        <h1>코인 랭킹 Top7</h1>
      </Header>

      {isListLoading ? (
        'Loading...'
      ) : (
        <ul>
          {majorCoinsInfo?.map((coin, i) => (
            <li key={i}>
              {coin.name} {coin.price}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );

*/

//<CoinInfo symbol={coin} /></Container></Container>/
//   {majorCoins?.map((coin,i)=>(<li key={i}><CoinInfo symbol={coin} /><li/>))}
/*
 {majorCoinsInfo?.map((coin, i) => (
            <li key={i}>
              <CoinInfo data={majorCoinsInfo} />
            </li>
          ))}
function Home() {
  const { isLoading, data: tickers } = useQuery<Itickers[]>('tickers', fetchTickers);
  const columns = useMemo(
    () => [
      {
        Header: '코인',
        accessor: 'name',
      },
      {
        Header: '시가총액',
        accessor: 'marketCap',
      },
      {
        Header: '가격',
        accessor: 'price',
      },
      {
        Header: '거래량',
        accessor: 'volumn24h',
      },
      {
        Header: '유통코인 수',
        accessor: 'circulatingSupply',
      },
    ],
    [],
  );
  return (
    <Container>
      <Header>
        <h1>코인 랭킹 Top7</h1>
      </Header>
      {isLoading ? (
        'Loading...'
      ) : (
        <CoinList>
          {tickers?.slice(0, 7).map((ticker) => (
            <li key={ticker.id}>
              <Link to={{ pathname: `/${ticker.id}`, state: { name: ticker.name } }}>
                <img
                  width="25px"
                  height="25px"
                  src={`https://cryptoicon-api.vercel.app/api/icon/${ticker.symbol.toLowerCase()}`}
                />
                {ticker.name}
                {ticker.quotes.KRW.market_cap}
              </Link>
            </li>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
*/
