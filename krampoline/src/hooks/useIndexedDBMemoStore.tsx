import { useLiveQuery } from "dexie-react-hooks";
import { getAllMemoStoreQuery } from "../service/database/api";
import { Directory } from "../types/Memo.types";

export default function useIndexedDBMemoStore(tempUserId?: string) {
  const memoStore = useLiveQuery(async () => {
    if (tempUserId) {
      const result = await getAllMemoStoreQuery(tempUserId);
      return result;
    }
  }, [tempUserId]) as Directory | undefined;

  return {
    memoStore,
  };
}
