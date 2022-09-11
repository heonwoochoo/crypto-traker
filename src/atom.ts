import { atom, selector } from "recoil";

export const targetCoin = atom<string | undefined>({
  key: "coin",
  default: "",
});

export const marketName = atom<string | undefined>({
  key: "market",
  default: "",
});
