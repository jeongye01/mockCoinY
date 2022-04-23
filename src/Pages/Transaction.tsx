import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  height: 380px;
  background-color: ${(props) => props.theme.panelColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 15px;
  font-size: 14px;
  button {
    all: unset;
    &:hover {
      background-color: ${(props) => props.theme.lineColor};
      cursor: pointer;
    }
  }
`;

const TradeType = styled.div<{ isBidSelected: boolean }>`
  display: flex;
  width: 100%;
  button {
    font-size: 16px;
    width: 50%;
    padding: 15px;
    text-align: center;
    &:first-child {
      border-radius: 15px 0 0 0;
      background-color: ${(props) => (props.isBidSelected ? props.theme.red : props.theme.lineColor)};
      color: ${(props) => (props.isBidSelected ? props.theme.panelColor : 'gray')};
    }
    &:last-child {
      border-radius: 0 15px 0 0;
      background-color: ${(props) => (props.isBidSelected ? props.theme.lineColor : props.theme.blue)};
      color: ${(props) => (props.isBidSelected ? 'gray' : props.theme.panelColor)};
    }
  }
`;

const Main = styled.main`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 100%;
  }
`;
const UserInfo = styled.div`
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
  }
  margin-bottom: 10px;
`;
const Form = styled.div`
  width: 100%;
`;
const Setting = styled.div`
  height: 30px;
  span {
    display: block;
    font-size: 10px;
    margin-bottom: 5px;
  }
  div {
    height: 100%;
    background: ${(props) => props.theme.lineColor};
    display: flex;
    flex-wrap: nowrap;
    gap: 1px;
    padding: 1px;

    border-radius: 15px;
    button {
      border: 1px solid ${(props) => props.theme.lineColor};
      background: ${(props) => props.theme.panelColor};
      width: 10%;
      text-align: center;
      &:last-child {
        border-radius: 0px 15px 15px 0px;
      }
    }
    input {
      all: unset;
      border-radius: 15px 0 0 15px;
      border: 1px solid ${(props) => props.theme.lineColor};
      background-color: ${(props) => props.theme.panelColor};
      width: 80%;
      padding: 0px 10px;
      font-size: 16px;
    }
  }
  margin-bottom: 30px;
`;
const Percentage = styled.div`
  margin-top: -10px;

  display: flex;

  button {
    font-size: 12px;
    width: 25%;
    padding: 5px;
    text-align: center;
    border: 1px solid ${(props) => props.theme.lineColor};
    &:first-child {
      border-radius: 10px 0 0 10px;
    }
    &:last-child {
      border-radius: 0 10px 10px 0;
    }
  }
  margin-bottom: 15px;
`;
const Submit = styled.div<{ isBidSelected: boolean }>`
  width: 100%;
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  button {
    font-size: 16px;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    padding: 10px;
    border-radius: 15px;
    color: ${(props) => props.theme.panelColor};
    background-color: ${(props) => (props.isBidSelected ? props.theme.red : props.theme.blue)};

    &:hover {
      background-color: ${(props) => (props.isBidSelected ? props.theme.red : props.theme.blue)};
    }
  }
`;
interface IPriceInfo {
  price: number;
  price_str: string;
  unit?: number;
  decP?: number; //소수점 자릿수
}
function Transaction() {
  const [bidSelected, setBidSelected] = useState<boolean>(true);
  //const [priceInfo, setPriceInfo] = useState<IPriceInfo>({ price: 0, price_str: '' });
  const [price, setPrice] = useState<string>('');
  const [size, setSize] = useState<number>(0);
  const tickerList = useSelector((state: RootState) => state.tickerList);
  const [loading, setLoading] = useState<boolean>(true);
  const [str, setStr] = useState<string>('');
  const { coinId } = useParams<{ coinId: string }>();
  /*
  const onClickPlus = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    setsize((prev) => (prev ? (prev += 1) : 0));
  };
  const onClickMinus = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    setsize((prev) => (prev ? (prev -= 1) : 100));
  };*/
  useEffect(() => {
    if (!coinId || !tickerList?.value?.[coinId]) return;
    setPrice(() => {
      const { trade_price: price } = tickerList?.value?.[coinId];
      return price + '';
    });
  }, [coinId]);
  useEffect(() => {
    if (!str) {
      setPrice('');
      return;
    }
    if (!+str) return;
    console.log(+str, str);
    if (str.split('.').length > 1 && str.split('.')[1].length > 2) return;
    setPrice(str);
  }, [str]);
  return (
    <Container>
      <TradeType isBidSelected={bidSelected}>
        <button onClick={() => setBidSelected(true)}>매수</button>

        <button onClick={() => setBidSelected(false)}>매도</button>
      </TradeType>

      <Main>
        <UserInfo>
          <div>
            <span>주문가능</span>
            <span>{bidSelected ? `0KRW` : `0 ${coinId?.split('-')[1] || null}`}</span>
          </div>
          <div>
            <span>매{bidSelected ? `수` : `도`} 가능</span>
            <span>{bidSelected ? `0KRW` : `0 ${coinId?.split('-')[1] || null}`}</span>
          </div>
        </UserInfo>

        <Form>
          <Setting>
            <span>가격(KRW)</span>
            <div>
              <input
                type="text"
                value={price || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStr(event.currentTarget.value)}
              />
              <button
                onClick={() =>
                  setPrice((prev) => {
                    if (prev?.split('.').length > 1) {
                      const decP = price?.split('.')[1].length; //소숫점 자릿수
                      return (+prev + 1 / Math.pow(10, decP)).toFixed(decP);
                    } else {
                      return (+prev + 1).toFixed(0);
                    }
                  })
                }
              >
                +
              </button>
              {
                //minus 단위로 못가게 처리 필요
              }
              <button
                onClick={() =>
                  setPrice((prev) => {
                    if (prev?.split('.').length > 1) {
                      const decP = price?.split('.')[1].length; //소숫점 자릿수
                      return (+prev - 1 / Math.pow(10, decP)).toFixed(decP);
                    } else {
                      return (+prev - 1).toFixed(0);
                    }
                  })
                }
              >
                -
              </button>
            </div>
          </Setting>
          <Setting>
            <span>수량{`(${coinId})`}</span>
            <div>
              <input onChange={(event: React.FormEvent<HTMLInputElement>) => setSize(+event.currentTarget.value)} />
              <button onClick={() => setSize((prev) => (prev ? (prev += 1) : 100))}>+</button>
              <button onClick={() => setSize((prev) => (prev ? (prev -= 1) : 0))}>-</button>
            </div>
          </Setting>
          <Percentage>
            <button>10%</button>
            <button>25%</button>
            <button>50%</button>
            <button>100%</button>
          </Percentage>
          <Submit isBidSelected={bidSelected}>
            <div>
              <span>매{bidSelected ? `수` : `도`} 금액</span>
              <span>{((+price || 0) * (size || 0)).toFixed(0)}KRW</span>
            </div>
            <button>매{bidSelected ? `수` : `도`}</button>
          </Submit>
        </Form>
      </Main>
    </Container>
  );
}
export default Transaction;
/*
(prev) => {
                    if (!prev) return;
                    console.log(prev, event?.currentTarget?.value);
                    if (!+event?.currentTarget?.value) return { ...prev };
                    console.log(+event?.currentTarget?.value);

*/
