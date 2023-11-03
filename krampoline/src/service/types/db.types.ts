export interface MemoStore {
  id: string;
}

export interface Directory {
  id: string;
  name: string;
  parentId?: string;
  memoStoreId: string;
  directories?: Directory[];
  memos?: Memo[];
}

export interface Memo {
  id: string;
  title: string;
  content: string;
  directoryId?: string;
  memoStoreId: string;
}
