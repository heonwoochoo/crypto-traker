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
const Container = styled.div``;
const Header = styled.h1``;
const CoinList = styled.ul``;
const CoinListTitle = styled.h2``;
const Coin = styled.li``;
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
      <Header>코인</Header>
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
            <Rate>{(coin.change_rate * 100).toFixed(2)} ▲</Rate>
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
            <Rate>{(coin.change_rate * 100).toFixed(2)} ▼</Rate>
            <Market>{coin.market.split("-")[0]}</Market>
          </Coin>
        ))}
      </CoinList>
    </Container>
  );
}

export default Coins;
