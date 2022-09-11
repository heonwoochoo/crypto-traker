import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getCandle } from "../api";
import { marketName } from "../atom";
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
const Container = styled.div``;
const SelectUnit = styled.select`
  padding: 5px;
  margin-bottom: 10px;
  background-color: #212121;
  color: ${(props) => props.theme.textColor};
  border-radius: 7px;
`;
function Chart_() {
  const marketName_ = useRecoilValue(marketName);
  const [selectTime, setSelectTime] = useState<string>("1minute");
  const candle = useQuery<IChart[]>([selectTime, marketName_], getCandle);
  const series: any = [
    {
      data: [],
    },
  ];
  candle.data?.reverse().forEach((v) => {
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
  const handleChangeTime = ({
    currentTarget,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectTime(currentTarget.value);
  };
  const times = [
    "1minute",
    "3minutes",
    "5minutes",
    "15minutes",
    "30minutes",
    "1hour",
    "4hours",
    "day",
    "week",
    "month",
  ];
  return (
    <Container>
      <SelectUnit onChange={handleChangeTime}>
        {times.map((time, i) => (
          <option key={i} value={time}>
            {time}
          </option>
        ))}
      </SelectUnit>
      <Chart series={series} type="candlestick" width="600" options={option} />
    </Container>
  );
}

export default Chart_;
