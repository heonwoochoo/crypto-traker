import { atom } from "recoil";

export const targetCoin = atom<string | undefined>({
  key: "coin",
  default: "",
});
