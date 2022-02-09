import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { coinListState, focusedCoin } from '../atoms';

const Container = styled.div`
  background-color: ${(props) => props.theme.panelColor};
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 10px;
`;
const InfoRow = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  div {
    color: gray;
    margin-right: 15px;
  }
  &:last-child {
    font-size: 14px;
  }
`;
const PriceRate = styled.span<{ isRaised?: boolean }>`
  span:first-child {
    font-size: 20px;
    font-weight: 600;
    margin-right: 5px;
  }
  color: ${(props) => (props.isRaised ? props.theme.red : props.theme.blue)};
`;
const HighLow = styled.div`
  display: flex;

  div:first-child {
    margin-right: 10px;
    span:last-child {
      color: ${(props) => props.theme.red};
    }
  }
  div:last-child {
    span:last-child {
      color: ${(props) => props.theme.blue};
    }
  }
`;
function CoinOutline() {
  const coinId = useRecoilValue(focusedCoin);
  const coins = useRecoilValue(coinListState);
  console.log(coinId);

  return (
    <Container>
      <InfoRow>
        <img width="15px" height="15px" src={`https://cryptoicon-api.vercel.app/api/icon/${coinId.toLowerCase()}`} />{' '}
        {coinId}
      </InfoRow>
      <InfoRow>
        <PriceRate isRaised={coins[coinId]?.chgRate >= 0}>
          <span>{Math.floor(coins[coinId]?.closePrice).toLocaleString()}</span>
          <span>{coins[coinId]?.chgRate >= 0 ? `+${coins[coinId]?.chgRate}` : coins[coinId]?.chgRate}% </span>
        </PriceRate>
      </InfoRow>
      <InfoRow>
        <HighLow>
          <div>
            <span>고가</span> <span>{Math.floor(coins[coinId]?.highPrice).toLocaleString()}</span>
          </div>
          <div>
            <span>저가</span> <span>{Math.floor(coins[coinId]?.lowPrice).toLocaleString()}</span>
          </div>
        </HighLow>

        <div>
          {' '}
          <span>전일가</span> <span>{Math.floor(coins[coinId]?.prevClosePrice).toLocaleString()}</span>{' '}
        </div>
        <div>
          {' '}
          <span>거래대금</span> <span>{Math.floor(coins[coinId]?.value).toLocaleString()}</span>{' '}
        </div>
      </InfoRow>
    </Container>
  );
}

export default CoinOutline;
