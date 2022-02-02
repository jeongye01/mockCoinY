import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { fetchBithumbTickers, fetchPriceHistory, fetchBithumbTicker } from '../Api';
//import CoinInfo from './Tickers/CoinInfo';

import Tickers from './Tickers/Tickers';
import CoinOutline from './CoinOuline';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';
const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
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

function Home() {
  const setterFn = useSetRecoilState(isDarkAtom);
  return (
    <Container>
      <button onClick={() => setterFn((prev) => !prev)}>Toggel Button</button>
      <Tickers />
    </Container>
  );
}

export default Home;
