import { Outlet, useNavigate, useParams } from "react-router-dom";
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
const DetailBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  margin: 30px 0;
  gap: 100px;
`;
const Detail = styled.button`
  padding: 5px 20px;
  color: ${(props) => props.theme.textColor};
  background-color: black;
`;
const GoHome = styled.svg`
  position: fixed;
  left: 30px;
  top: 30px;
  :hover {
    fill: ${(props) => props.theme.textColor};
    transition: 0.1s linear;
  }
`;
function Coin() {
  const { coinId } = useParams();
  const name = useRecoilValue(targetCoin);
  const navigate = useNavigate();
  const showChart = () => {
    navigate(`${process.env.PUBLIC_URL}/${coinId}/chart`);
  };
  const showPrice = () => {
    navigate(`${process.env.PUBLIC_URL}/${coinId}/price`);
  };
  const goHome = () => {
    navigate(`${process.env.PUBLIC_URL}`);
  };
  return (
    <Container>
      <HeaderBox>
        <Icon
          src={`https://static.upbit.com/logos/${coinId?.split("-")[1]}.png`}
        />
        <Header>{name}</Header>
      </HeaderBox>
      {coinId && <CoinDetail coinId={coinId} />}
      <DetailBox>
        <Detail onClick={showChart}>Chart</Detail>
        <Detail onClick={showPrice}>Price</Detail>
      </DetailBox>
      <GoHome
        onClick={goHome}
        height="48px"
        viewBox="0 0 24 24"
        width="48px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </GoHome>
      <Outlet />
    </Container>
  );
}

export default Coin;
