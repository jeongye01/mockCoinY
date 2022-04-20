import { useEffect, useState } from 'react';
import { getCandlestick } from '../Api';
import ReactApexChart from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
const Container = styled.div`
  background-color: ${(props) => props.theme.panelColor};
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 10px 20px;
  width: 990px;
  min-width: 990px;
  height: 430px;
  margin-top: 20px;
`;
const Buttons = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
  color: gray;
  font-size: 14px;
`;
const Button = styled.button<{ selected: boolean }>`
  all: unset;
  padding: 5px;
  border-radius: 5px;
  ${({ selected }) =>
    selected
      ? css`
          background-color: lightgray;
          color: black;
        `
      : css`
          &:hover {
            background-color: lightgray;
            color: black;
          }
        `};
`;
interface Idwm {
  [key: string]: { title: string };
}
const dwm: Idwm = { days: { title: '1일' }, weeks: { title: '1주' }, months: { title: '1개월' } };
const minutes = [1, 3, 5, 10, 15, 30, 60, 240];
interface IParams {
  path: string;
  unit?: number;
  market: string;
}
interface ICandleStricInfo {
  high_price: number; //H
  low_price: number; //L
  opening_price: number; //O
  trade_price: number; //C
  timestamp: number;
  candle_date_time_kst: string;
}
function convertToTimestamp(time: string): number {
  const date = new Date(time);
  const result = date.getTime();
  console.log(result);
  return result;
}
function Candlestick() {
  const { coinId } = useParams<{ coinId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [params, setParams] = useState<IParams>();
  const [chartState, setChartState] = useState<any>();
  //any 고치기

  useEffect(() => {
    if (!params || !coinId) return;
    setLoading(true);
    const getCandleStickData = async () => await getCandlestick(coinId, params.path, params.unit);
    getCandleStickData().then((data: ICandleStricInfo[]) => {
      if (!data) return;
      console.log(data);
      const chartData = data?.map((stick) => [
        new Date().getTime(),
        [stick.opening_price, stick.high_price, stick.low_price, stick.trade_price],
      ]);
      const STATE = {
        series: [
          {
            data: chartData,
          },
        ],

        options: {
          chart: {
            type: 'candlestick',
            height: 350,
          },
          title: {
            text: coinId,
            align: 'left',
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#3C90EB',
                downward: '#DF7D46',
              },
              wick: {
                useFillColor: true,
              },
            },
            stroke: {
              width: 1,
            },
          },
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        },
      };

      setChartState(STATE);
      setLoading(false);
    });
  }, [coinId, params]);
  console.log(params);
  return (
    <Container>
      <Buttons>
        <div>
          {minutes.map((minute) => (
            <Button
              selected={params?.unit === minute}
              key={minute}
              onClick={() => setParams({ path: 'minutes', market: coinId, unit: minute })}
            >
              <>{minute < 60 ? <span>{minute}분</span> : <span>{minute / 60}시간</span>}</>
            </Button>
          ))}
        </div>
        <div>
          {Object.keys(dwm).map((interval) => (
            <Button
              selected={params?.path === interval}
              key={interval}
              onClick={() => setParams({ path: interval, market: coinId })}
            >
              <span>{dwm?.[interval]?.title}</span>
            </Button>
          ))}
        </div>
      </Buttons>

      {loading ? (
        <h1>...Loading</h1>
      ) : (
        <div>
          <ReactApexChart options={chartState?.options} series={chartState?.series} type="candlestick" height={350} />
        </div>
      )}
    </Container>
  );
}

export default Candlestick;
/*

<div>
            <ReactApexChart options={chartState?.options} series={chartState?.series} type="candlestick" height={350} />
          </div>
*/
