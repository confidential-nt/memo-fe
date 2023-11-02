export interface MemoStore {
  id?: string;
  directories: Directory[];
  memos: Memo[];
}

export interface Directory {
  id?: string;
  name: string;
  directories: Directory[];
  memos: Memo[];
}

export interface Memo {
  id?: string;
  title: string;
  content: string;
}
