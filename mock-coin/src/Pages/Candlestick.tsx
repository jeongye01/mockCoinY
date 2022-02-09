import { useEffect, useState } from 'react';
import { fetchCandlestick } from '../Api';
import ReactApexChart from 'react-apexcharts';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { focusedCoin } from '../atoms';
function Candlestick() {
  const [chartState, setChartState] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const order_currency = useRecoilValue(focusedCoin);
  const [chart_intervals, setChartIntervals] = useState<string>('24h');
  const intervals = ['1m', '3m', '5m', '10m', '30m', '1h', '6h', '12h', '24h'];
  //any 고치기
  useEffect(() => {
    console.log(order_currency, chart_intervals);
    fetchCandlestick(order_currency, chart_intervals).then((result) => {
      const data = result.data.slice(-120, -1).map((d: any) => ({ x: new Date(d[0]), y: [d[1], d[3], d[4], d[2]] }));
      const STATE = {
        series: [
          {
            data,
          },
        ],
        options: {
          chart: {
            type: 'candlestick',
            height: 350,
          },
          title: {
            text: 'CandleStick Chart',
            align: 'left',
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
      setIsLoading(false);
    });
  }, [chart_intervals, order_currency]);
  return (
    <>
      {isLoading ? (
        <h1>candleStick</h1>
      ) : (
        <div>
          <div>
            {intervals.map((interval) => (
              <button key={interval} onClick={() => setChartIntervals(interval)}>
                {interval}
              </button>
            ))}
          </div>
          <div>
            <ReactApexChart options={chartState?.options} series={chartState?.series} type="candlestick" height={350} />
          </div>
        </div>
      )}
    </>
  );
}

export default Candlestick;
