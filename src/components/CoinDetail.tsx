import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getRecentInfo } from "../api";
import { targetCoin } from "../atom";
import { getKoreanTime } from "../utils";

interface ICoinId {
  coinId: string | undefined;
}

interface IRecent {
  ask_bid: string; // 매도 매수
  change_price: number; // 변화량
  market: string;
  prev_closing_price: number; // 전일 종가
  timestamp: number;
  trade_date_utc: string; // 체결 일자
  trade_price: number; // 체결 가격
  trade_time_utc: string; // 체결 시각
  trade_volume: number; // 체결량
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: cetner;
  width: 60vw;
  background-color: #212121;
  padding: 20px;
  border-radius: 15px;
`;
const ItemHeader = styled.h1`
  margin-bottom: 10px;
`;
const ItemList = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
`;
const Item = styled.li`
  width: 90px;
  text-align: center;
`;
const ValueList = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3px;
`;
const Value = styled.li`
  width: 90px;
  text-align: center;
  color: ${(props) =>
    props.value == "ASK" ? "red" : props.value == "BID" ? "blue" : ""};
`;
function CoinDetail({ coinId }: ICoinId) {
  const name = useRecoilValue(targetCoin);
  const recent = useQuery<IRecent[]>([coinId], getRecentInfo);
  console.log(recent.data);
  return (
    <Container>
      <ItemHeader>최근 체결 내역</ItemHeader>
      <ItemList>
        {["체결 일자", "체결 시각", "체결 가격", "매도/매수", "체결량"].map(
          (item, i) => (
            <Item key={i}>{item}</Item>
          )
        )}
      </ItemList>
      {recent.data?.map((data, i) => (
        <ValueList key={i}>
          {[
            data.trade_date_utc,
            getKoreanTime(data.trade_time_utc, data.trade_date_utc),
            data.trade_price,
            data.ask_bid,
            data.trade_volume.toFixed(2),
          ].map((v, i) => (
            <Value key={i} value={v}>
              {v}
            </Value>
          ))}
        </ValueList>
      ))}
    </Container>
  );
}

export default CoinDetail;
