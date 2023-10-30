export type Memo = {
  id: string;
  title: string;
  content: string;
  type?: string;
};

export type Directory = {
  id: string;
  name?: string;
  directories?: Directory[];
  memos?: Memo[];
  children?: TreeNode[];
  isClosed?: boolean;
  type?: string;
};

export type TreeNode = Directory | Memo;
