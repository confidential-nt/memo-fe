import { db } from "./db";
import { v4 as uuid } from "uuid";

export async function initMemoStore(userId: string) {
  let existingMemoStore = await db.memoStores.get(userId);
  if (!existingMemoStore) {
    const newMemoStore = {
      id: userId,
      directories: [],
      memos: [],
    };
    existingMemoStore = newMemoStore;
    await db.memoStores.add(newMemoStore);
  }
  return existingMemoStore;
}

export async function addRootDirectory(userId: string) {
  const memoStore = await db.memoStores.get(userId);
  if (memoStore) {
    memoStore.directories.push({
      id: uuid(),
      name: "",
      directories: [],
      memos: [],
    });
    await db.memoStores.put(memoStore);
  }
}

export async function addRootMemo(userId: string) {
  const memoStore = await db.memoStores.get(userId);
  if (memoStore) {
    memoStore.memos.push({
      id: uuid(),
      title: "메모",
      content: "",
    });
    await db.memoStores.put(memoStore);
  }
}

export const getAllMemoStoreQuery = (userId: string) =>
  db.memoStores.where("id").equals(userId).first();
