import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { fetchBithumbTickers } from '../../Api';
import CoinInfo from './CoinInfo';

const Container = styled.div`
  width: 380px;
  background-color: ${(props) => props.theme.panelColor};
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
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
//Itickers[]
//any 고치기
function Tickers() {
  const [initCoins, setInitCoins] = useState<Iticker[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBithumbTickers().then((result) => {
      const { data: tickers } = result;
      const symbols = Object.keys(tickers).slice(0, 100);

      let tmpArr: Iticker[] = [];
      symbols?.forEach((symbol) => {
        const {
          min_price,
          max_price,
          prev_closing_price,
          units_traded_24H,
          closing_price,
          fluctate_rate_24H,
          acc_trade_value_24H,
        } = tickers[symbol];

        tmpArr.push({
          symbol,
          closePrice: closing_price,
          chgRate: fluctate_rate_24H,
          value: acc_trade_value_24H,
          lowPrice: min_price,
          highPrice: max_price,
          prevClosePrice: prev_closing_price,
          volume: units_traded_24H,
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
        <Container>
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
              {initCoins?.slice(0, 100).map((coin) => (
                <CoinInfo symbol={coin.symbol} initCoin={coin} key={coin.symbol} />
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}

export default Tickers;
