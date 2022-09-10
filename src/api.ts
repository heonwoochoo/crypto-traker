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
  const date = queryKey[0];
  const unit = queryKey[1];
  const market = queryKey[2];
  return fetch(
    `${BASE_URI_UPBIT}/candles/${date}/${unit}?market=${market}&count=200`
  ).then((res) => res.json());
}
