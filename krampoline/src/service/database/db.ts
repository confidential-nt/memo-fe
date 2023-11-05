import { MemoStore, Directory, Memo } from "../types/db.types";
import Dexie from "dexie";

class MyAppDatabase extends Dexie {
  memoStores: Dexie.Table<MemoStore, string>;
  directories: Dexie.Table<Directory, string>;
  memos: Dexie.Table<Memo, string>;

  constructor() {
    super("MyAppDatabase");

    this.version(1).stores({
      memoStores: "++id",
      directories: "++id, name, *parentId, memoStoreId",
      memos: "++id, title, content, directoryId, memoStoreId",
    });

    this.memoStores = this.table("memoStores");
    this.directories = this.table("directories");
    this.memos = this.table("memos");
  }
}

export const db = new MyAppDatabase();
