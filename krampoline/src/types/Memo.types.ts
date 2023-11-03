import { NodeApi } from "react-arborist";

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

export type onCreateArgs = {
  parentId: string | null;
  index: number;
  type: string;
  parentNode: NodeApi<Memo | Directory> | null;
};

export type onDeleteArgs = {
  ids: string[];
  nodes: NodeApi<Memo | Directory>[];
};

export type onRenameArgs = {
  id: string;
  name: string;
  node: NodeApi<Memo | Directory>;
};

export type onMoveArgs = {
  dragIds: string[];
  dragNodes: NodeApi<Memo | Directory>[];
  parentId: string | null;
  parentNode: NodeApi<Memo | Directory> | null;
  index: number;
};
