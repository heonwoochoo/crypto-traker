const BASE_URI_UPBIT = "https://api.upbit.com/v1";

// 코인리스트를 받아옵니다.
export function getAllCoinList() {
  return fetch(`${BASE_URI_UPBIT}/market/all`).then((res) => res.json());
}

// 코인의 현재가 정보를 받아옵니다.
export function getCurrentInfo({ queryKey }: any) {
  const query = queryKey[0].join("%2C");
  return fetch(`${BASE_URI_UPBIT}/ticker?markets=${query}`).then((res) =>
    res.json()
  );
}

// 코인의 최근 체결 내역을 조회합니다.
export function getRecentInfo({ queryKey }: any) {
  return fetch(
    `${BASE_URI_UPBIT}/trades/ticks?market=${queryKey[0]}&count=10`
  ).then((res) => res.json());
}
