import { atom } from "recoil";
import { Memo } from "../types/Memo.types";

export const drawerState = atom({
  key: "drawerState", // 고유한 키
  default: false, // 초기 상태 값
});

export const memoState = atom<Memo | null>({
  key: "memoState",
  default: null,
});
