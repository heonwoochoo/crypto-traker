import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { getAllCoinList, getCurrentInfo } from "../api";
import CoinList from "../components/CoinList";
interface ICoin {
  market: string;
  korean_name: string;
  english_name: string;
}
interface ICoinInfo {
  market: string;
  change: string;
  change_rate: number;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;
const Header = styled.h1`
  font-family: "Do Hyeon", sans-serif;
  font-size: 5rem;
  width: 80%;
  margin: 30px auto;
  text-align: center;
`;
function Coins() {
  const coins = useQuery<ICoin[]>(["coin", "list"], getAllCoinList);
  const coinNames = coins.data?.map((v) => v.market);
  const currentInfo = useQuery<ICoinInfo[]>([coinNames], getCurrentInfo);
  const upChangeRate = currentInfo.data
    ?.filter(
      (info) => info.change === "RISE" && info.market.split("-")[0] === "KRW"
    )
    .sort((a, b) => b.change_rate - a.change_rate)
    .slice(0, 10);
  const downChangeRate = currentInfo.data
    ?.filter(
      (info) => info.change === "FALL" && info.market.split("-")[0] === "KRW"
    )
    .sort((a, b) => b.change_rate - a.change_rate)
    .slice(0, 10);
  return (
    <Container>
      <Header>CryptoTraker</Header>
      {currentInfo.isLoading ? (
        "Loading..."
      ) : (
        <CoinList
          title="전일대비 시세 급등 코인 🔥"
          filteredData={upChangeRate}
          nameData={coins.data}
        />
      )}
      {currentInfo.isLoading ? null : (
        <CoinList
          title="전일대비 시세 급락 코인 💩"
          filteredData={downChangeRate}
          nameData={coins.data}
        />
      )}
    </Container>
  );
}

export default Coins;
