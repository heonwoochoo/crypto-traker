import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import { getCandle } from "../api";
import { getDate } from "../utils";
interface IChart {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: 1;
}
function Chart_() {
  const candle = useQuery<IChart[]>(["minutes", 1, "KRW-BTC"], getCandle);
  console.log(candle.data);
  const series: any = [
    {
      data: [],
    },
  ];
  candle.data?.forEach((v) => {
    series[0].data.push({
      x: getDate(v.timestamp),
      y: [v.opening_price, v.high_price, v.low_price, v.trade_price],
    });
  });
  const option = {
    chart: {
      background: "#fff",
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "15px",
      },
      theme: "dark",
    },
  };
  return (
    <>
      <h1>Chart</h1>
      <Chart series={series} type="candlestick" width="700" options={option} />
    </>
  );
}

export default Chart_;
