import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getAllCoinList, getCurrentInfo } from "../api";
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
const CoinList = styled.ul`
  margin: 20px 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CoinListTitle = styled.h2`
  font-size: 18px;
`;
const Coin = styled.li`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
const Name = styled.span``;
const Rate = styled.span``;
const Market = styled.span``;
function Coins() {
  const coins = useQuery<ICoin[]>(["coin", "list"], getAllCoinList);
  const coinNames = coins.data?.map((v) => v.market);
  const currentInfo = useQuery<ICoinInfo[]>([coinNames], getCurrentInfo);
  const upChangeRate = currentInfo.data
    ?.filter((info) => info.change === "RISE")
    .sort((a, b) => b.change_rate - a.change_rate)
    .slice(0, 10);
  const downChangeRate = currentInfo.data
    ?.filter((info) => info.change === "FALL")
    .sort((a, b) => b.change_rate - a.change_rate)
    .slice(0, 10);
  const findKoreanName = (market: string) => {
    return coins.data?.find((coin) => coin.market === market)?.korean_name;
  };
  console.log(upChangeRate);
  return (
    <Container>
      <Header>CryptoTraker</Header>
      <CoinList>
        <CoinListTitle>전일대비 시세 급등 코인 🔥</CoinListTitle>
        {upChangeRate?.map((coin) => (
          <Coin key={coin.market}>
            <Icon
              src={`https://static.upbit.com/logos/${
                coin.market.split("-")[1]
              }.png`}
            />{" "}
            <Name>{findKoreanName(coin.market)}</Name>
            <Rate style={{ color: "red" }}>
              {(coin.change_rate * 100).toFixed(2)}% ▲
            </Rate>
            <Market>{coin.market.split("-")[0]}</Market>
          </Coin>
        ))}
      </CoinList>
      <CoinList>
        <CoinListTitle>전일대비 시세 급락 코인 💩</CoinListTitle>
        {downChangeRate?.map((coin) => (
          <Coin key={coin.market}>
            <Icon
              src={`https://static.upbit.com/logos/${
                coin.market.split("-")[1]
              }.png`}
            />{" "}
            <Name>{findKoreanName(coin.market)}</Name>
            <Rate style={{ color: "blue" }}>
              {(coin.change_rate * 100).toFixed(2)}% ▼
            </Rate>
            <Market>{coin.market.split("-")[0]}</Market>
          </Coin>
        ))}
      </CoinList>
    </Container>
  );
}

export default Coins;
