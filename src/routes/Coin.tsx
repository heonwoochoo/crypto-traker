import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { targetCoin } from "../atom";
import CoinDetail from "../components/CoinDetail";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderBox = styled.div`
  display: flex;
  width: 80%;
  margin: 30px auto;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Header = styled.h1`
  font-family: "Do Hyeon", sans-serif;
  font-size: 4rem;

  text-align: center;
`;
const Icon = styled.img`
  height: 3rem;
`;
function Coin() {
  const { coinId } = useParams();
  const name = useRecoilValue(targetCoin);
  return (
    <Container>
      <HeaderBox>
        <Icon
          src={`https://static.upbit.com/logos/${coinId?.split("-")[1]}.png`}
        />
        <Header>{name}</Header>
      </HeaderBox>
      {coinId && <CoinDetail coinId={coinId} />}
    </Container>
  );
}

export default Coin;
