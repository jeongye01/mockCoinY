import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { updateTickers, ITickers } from '../tickerListSlice';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';

import { setCoinList, CoinState } from '../coinListSlice';
import { setCoinSearchResult } from '../coinSearchSlice';
import { choseongExtraction, isOnlychoseong, searchFilter } from '../lilbs/utils';
import * as hangul from 'hangul-js';
//Itickers[]
//any 고치기

function Search() {
  // const [searchTerm, setSearchTerm] = useState<string>('');
  const tickerList = useSelector((state: RootState) => state.tickerList);
  const coinList = useSelector((state: RootState) => state.coinList);
  const coinSearchResult = useSelector((state: RootState) => state.coinSearchResult);
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [coinList, setCoinList] = useState<ICoin[]>();
  useEffect(() => {
    if (coinList && !coinList.value) return;
    //검색어에 부합하는 코인 추출
    const result = searchFilter(coinList.value, searchTerm);

    dispatch(setCoinSearchResult(result));
  }, [searchTerm]);
  return (
    <>
      <form
        onSubmit={(event: React.SyntheticEvent) => {
          event.preventDefault();
        }}
      >
        <input
          ref={searchRef}
          type="text"
          onChange={(event: React.FormEvent<HTMLInputElement>) => setSearchTerm(event.currentTarget.value)}
          onKeyUp={() => {
            let searchQuery = searchRef?.current?.value?.toUpperCase();
            setTimeout(() => {
              if (searchQuery === searchRef.current?.value?.toUpperCase()) {
                setSearchTerm(searchQuery || '');
              }
            }, 500);
          }}
        />
      </form>
    </>
  );
}

export default Search;

/*
interface PriceProps {
  price: number;
  change: 'RISE' | 'EVEN' | 'FALL';
}
function Price({ price, change }: PriceProps) {
  const [borderColor, setBorderColor] = useState<'red' | 'blue' | 'none'>('none');
  useEffect(() => {
    if (change === 'RISE') {
      setBorderColor('red');
    } else if (change === 'FALL') {
      setBorderColor('blue');
    } else {
      setBorderColor('none');
    }
  }, [price]);
  console.log(borderColor);
  return (
    <PriceContainer price={price} borderColor={borderColor}>
      {price || null}
    </PriceContainer>
  );
}

React.memo(Price);
/*

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
              <TickerTable />
            </tbody>
          </Table>

 */

/*
          
          
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

          
          */
