import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { setCoinSearchResult } from '../coinSearchSlice';
import { searchFilter } from '../lilbs/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: ${(props) => props.theme.panelColor};
  input {
    width: 80%;
    padding: 3px 6px;

    border: 2px solid black;
    margin-right: 5px;
    border-radius: 5px;
  }
  button {
    all: unset;
    font-size: 18px;
    color: ${(props) => props.theme.blue};
    cursor: pointer;
  }
`;

function Search() {
  const coinList = useSelector((state: RootState) => state.coinList);
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  useEffect(() => {
    if (coinList && !coinList.value) return;
    //검색어에 부합하는 코인 추출
    const result = searchFilter(coinList.value, searchTerm);

    dispatch(setCoinSearchResult(result));
  }, [searchTerm, coinList]);
  return (
    <>
      <Form
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
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
        </button>
      </Form>
    </>
  );
}

export default Search;
