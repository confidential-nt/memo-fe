import { MemoStore, Directory, Memo } from "../types/db.types";
import Dexie from "dexie";

class MyAppDatabase extends Dexie {
  memoStores: Dexie.Table<MemoStore, string>;
  directories: Dexie.Table<Directory, string>;
  memos: Dexie.Table<Memo, string>;

  constructor() {
    super("MyAppDatabase");

    this.version(1).stores({
      memoStores: "++id, directories, memos",
      directories: "++id, &name, directories, memos", // Assuming directory names are unique, adjust if necessary
      memos: "++id, title, content",
    });

    this.memoStores = this.table("memoStores");
    this.directories = this.table("directories");
    this.memos = this.table("memos");
  }
}

export const db = new MyAppDatabase();
