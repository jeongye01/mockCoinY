import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchBithumbTickers, fetchPaprikaTickers } from '../Api';
import CoinTable from '../Components/CoinTable';
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

  price: number;
  fluctate_rate_24H: number;
  units_traded_24H: number;
}
//Itickers[]
function Home() {
  const { isLoading: isSymbolLoading, data: symbols } = useQuery<any>(['forSymbol', 'tickers'], fetchPaprikaTickers);
  const { isLoading: isDetailLoading, data: details } = useQuery<any>([`forDetail`, `tickers`], fetchBithumbTickers);
  const [data, setData] = useState<Idata[]>();
  useEffect(() => {
    if (!isSymbolLoading && !isDetailLoading) {
      console.log(symbols.slice(0, 100));
      const symbols = Object.keys(details.data);
      //symbols.map((symbol)=>({symbol,details.data.symbol.}));
      /*
      const data = tickers?.slice(0, 7).map((ticker) => ({
        name: ticker.name,

        price: 123,
        fluctate_rate_24H:ticker.fluctate_rate_24H,
        units_traded_24H: ticker.units_traded_24H,
      }));
      console.log(data);
      setData(data);
      */
    }
  }, [isSymbolLoading, isDetailLoading]);

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
      {data === undefined ? 'Loading...' : <></>}
    </Container>
  );
}

/*
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
export default Home;
