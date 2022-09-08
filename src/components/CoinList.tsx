import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { targetCoin } from "../atom";

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
interface ICoinList {
  title: string;
  filteredData: ICoinInfo[] | undefined;
  nameData: ICoin[] | undefined;
}
const Container = styled.ul`
  margin: 20px 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.textColor};
`;
const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;
const Coin = styled.li`
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 3px;
  border-radius: 10px;
  background-color: #212121;
  :hover {
    opacity: 0.5;
  }
`;
const Box = styled.span`
  display: flex;
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
const Name = styled.span``;
const Rate = styled.span`
  padding-right: 60px;
`;
const Market = styled.span``;

function CoinList({ title, filteredData, nameData }: ICoinList) {
  const [target, setTarget] = useRecoilState(targetCoin);
  const findKoreanName = (
    names: ICoin[] | undefined,
    market: string,
    lang: "ko" | "en"
  ) => {
    return lang === "ko"
      ? names?.find((coin) => coin.market === market)?.korean_name
      : names?.find((coin) => coin.market === market)?.english_name;
  };
  const onClick = (name: string | undefined) => {
    setTarget(name);
  };
  return (
    <Container>
      <Title>{title}</Title>
      {filteredData?.map((coin) => (
        <Link
          style={{
            color: "inherit",
          }}
          onClick={() => {
            onClick(findKoreanName(nameData, coin.market, "en"));
          }}
          key={coin.market}
          to={`${process.env.PUBLIC_URL}/${coin.market}`}
        >
          <Coin>
            <Box>
              <Icon
                src={`https://static.upbit.com/logos/${
                  coin.market.split("-")[1]
                }.png`}
              />{" "}
              <Name>{findKoreanName(nameData, coin.market, "ko")}</Name>
            </Box>
            <Box>
              <Rate style={{ color: coin.change === "RISE" ? "red" : "blue" }}>
                {(coin.change_rate * 100).toFixed(2)}%{" "}
                {coin.change === "RISE" ? "▲" : "▼"}
              </Rate>
              <Market>{coin.market.split("-")[0]}</Market>
            </Box>
          </Coin>
        </Link>
      ))}
    </Container>
  );
}

export default CoinList;
