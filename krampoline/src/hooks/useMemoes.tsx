import { Memo } from "../types/Memo.types";
import { useRecoilState } from "recoil";
import { memoState } from "../state/atoms";

export default function useMemoes() {
  const [memo, setMemo] = useRecoilState<Memo | null>(memoState);

  const onClickMemo = (memo: Memo | null) => {
    setMemo(memo);
  };

  return {
    memo,
    onClickMemo,
  };
}
