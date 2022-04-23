import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';

const Container = styled.div`
  background-color: ${(props) => props.theme.panelColor};
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 10px 20px;
  width: 100%;
  height: 120px;
`;
const InfoRow = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  div {
    margin-right: 15px;
  }
  &:last-child {
    font-size: 14px;
  }
`;
const CoinName = styled.div`
  display: flex;
  color: black;
  span {
    margin-right: 8px;
    font-size: 13px;
  }
  span:first-child {
    font-size: 25px;
    font-weight: 600;
  }
`;
const PriceChange = styled.span<{ change: 'RISE' | 'EVEN' | 'FALL' }>`
  display: flex;

  span {
    margin-right: 8px;
    font-size: 13px;
  }
  span:first-child {
    font-size: 20px;
    font-weight: 600;
  }
  color: ${(props) =>
    props.change === 'EVEN' ? 'black' : `${props.change === 'RISE' ? props.theme.red : props.theme.blue}`};
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
  const { coinId } = useParams<{ coinId: string }>();
  const tickerList = useSelector((state: RootState) => state.tickerList);
  const coinList = useSelector((state: RootState) => state.coinList);
  //any 고치기
  const location = useLocation<any>();

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    console.log(tickerList?.value?.[coinId]);
    setLoading(true);
    if (!coinId) return;
    if (!tickerList?.value?.[coinId] || !coinList?.value) return;
    setLoading(false);
  }, [coinId, coinList, tickerList]);
  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
        <Container>
          <InfoRow>
            <CoinName>
              <span>{location?.state?.korean_name || <>비트코인</>}</span>
              <span>{coinId}</span>
            </CoinName>
          </InfoRow>
          <InfoRow>
            <PriceChange change={tickerList?.value?.[coinId]?.change}>
              <span>{tickerList?.value?.[coinId]?.trade_price?.toLocaleString()} </span>
              <span>{(100 * tickerList?.value?.[coinId]?.signed_change_rate).toFixed(2) || null}%</span>
              <span>({tickerList?.value?.[coinId].signed_change_price?.toLocaleString() || null})</span>
            </PriceChange>
          </InfoRow>
          <InfoRow>
            <HighLow>
              <div>
                <span>고가</span> <span>{tickerList?.value?.[coinId]?.high_price.toLocaleString()}</span>
              </div>
              <div>
                <span>저가</span> <span>{tickerList?.value?.[coinId]?.low_price.toLocaleString()}</span>
              </div>
            </HighLow>

            <div>
              <span>거래량</span> <span>{tickerList?.value?.[coinId]?.acc_trade_volume_24h?.toLocaleString()}KRW</span>
            </div>
            <div>
              <span>거래대금</span> <span>{tickerList?.value?.[coinId]?.acc_trade_price_24h?.toLocaleString()}KRW</span>
            </div>
          </InfoRow>
        </Container>
      )}
    </>
  );
}

export default CoinOutline;
