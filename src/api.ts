const BASE_URI_UPBIT = "https://api.upbit.com/v1";

// 코인리스트
export function getAllCoinList() {
  return fetch(`${BASE_URI_UPBIT}/market/all`).then((res) => res.json());
}

// 현재가 정보
export function getCurrentInfo({ queryKey }: any) {
  const query = queryKey[0].join("%2C");
  return fetch(`${BASE_URI_UPBIT}/ticker?markets=${query}`).then((res) =>
    res.json()
  );
}

// 최근 체결 내역을 조회
export function getRecentInfo({ queryKey }: any) {
  return fetch(
    `${BASE_URI_UPBIT}/trades/ticks?market=${queryKey[0]}&count=10`
  ).then((res) => res.json());
}

// 시세 캔들 조회
export function getCandle({ queryKey }: any) {
  let time;
  switch (queryKey[0]) {
    case "1minute":
      time = "minutes/1";
      break;
    case "3minutes":
      time = "minutes/3";
      break;
    case "5minutes":
      time = "minutes/5";
      break;
    case "15minutes":
      time = "minutes/15";
      break;
    case "30minutes":
      time = "minutes/30";
      break;
    case "1hour":
      time = "minutes/60";
      break;
    case "4hours":
      time = "minutes/240";
      break;
    case "day":
      time = "days";
      break;
    case "week":
      time = "weeks";
      break;
    case "month":
      time = "months";
  }
  const market = queryKey[1];
  return fetch(
    `${BASE_URI_UPBIT}/candles/${time}?market=${market}&count=100`
  ).then((res) => res.json());
}
