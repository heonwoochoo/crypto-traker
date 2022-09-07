const BASE_URI = "https://api.upbit.com/v1";

// 코인리스트를 받아옵니다.
export function getAllCoinList({ queryKey }: any) {
  console.log(queryKey);
  return fetch(`${BASE_URI}/market/all`).then((res) => res.json());
}

// 코인의 현재가 정보를 받아옵니다.
export function getCurrentInfo({ queryKey }: any) {
  const query = queryKey[0].join("%2C");
  return fetch(`${BASE_URI}/ticker?markets=${query}`).then((res) => res.json());
}
