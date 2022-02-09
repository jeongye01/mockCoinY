import { useState } from 'react';
import styled from 'styled-components';

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
const Form = styled.form`
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
function Trade() {
  const [bidSelected, setBidSelected] = useState<boolean>(true);
  return (
    <Container>
      <TradeType isBidSelected={bidSelected}>
        <button onClick={() => setBidSelected(true)}>매수</button>

        <button onClick={() => setBidSelected(false)}>매도</button>
      </TradeType>

      <Main>
        <UserInfo>
          <div>
            <span>보유</span>
            <span>{bidSelected ? `719KRW` : `6.0000XRP`}</span>
          </div>
          <div>
            <span>매{bidSelected ? `수` : `도`} 가능</span>
            <span>{bidSelected ? `719KRW` : `6.0000XRP`}</span>
          </div>
        </UserInfo>

        <Form>
          <Setting>
            <span>가격(KRW)</span>
            <div>
              <input value="981" />
              <button>+</button>
              <button>-</button>
            </div>
          </Setting>
          <Setting>
            <span>수량(XRP)</span>
            <div>
              <input value="981" />
              <button>+</button>
              <button>-</button>
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
              <span>72KRW</span>
            </div>
            <button>매{bidSelected ? `수` : `도`}</button>
          </Submit>
        </Form>
      </Main>
    </Container>
  );
}
export default Trade;
