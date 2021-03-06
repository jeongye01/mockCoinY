import styled from 'styled-components';
import Candlestick from './Candlestick';
import Tickers from './Tickers';
import CoinOutline from './CoinOuline';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { focusedCoin, isDarkAtom } from '../atoms';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Orderbook from './Orderbook';
import Trade from './Trade';
import Transaction from './Transaction';

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
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
const Left = styled.div`
  margin-right: 20px;
  display: flex;
  width: 990px;
  min-width: 990px;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Right = styled.div`
  width: 400px;
  min-width: 400px;
`;
function Home() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    history.push(`/KRW-BTC`);
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Container>
          <Left>
            <CoinOutline />
            <Candlestick />
            <Wrapper>
              <Trade />
              <Orderbook />
              <Transaction />
            </Wrapper>
          </Left>
          <Right>
            <Tickers />
          </Right>
        </Container>
      )}
    </>
  );
}

export default Home;

/*
  {isLoading ? null : (
        <Container>
          <div>
            <CoinOutline />
            <Candlestick />

            <div style={{ display: 'flex' }}>
              {
            }
              <Trade />
              <RevenueStatus />
            </div>
          </div>
          <Tickers />
        </Container>
      )}



*/
