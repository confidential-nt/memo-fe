import { atom } from "recoil";
import { Memo } from "../types/Memo.types";

export const drawerState = atom({
  key: "drawerState",
  default: false,
});

export const memoState = atom<Memo | null>({
  key: "memoState",
  default: null,
});
