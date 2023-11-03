import React from "react";
import Drawer from "./drawer/Drawer";
import TreeView from "./TreeView";
import { Directory, Memo, onCreateArgs } from "../../types/Memo.types";
import { IdObj } from "react-arborist/dist/types/utils";

type Props = {
  className: string;
  onClose?: (event: React.KeyboardEvent | React.MouseEvent) => void;
  onOpen?: (event: React.KeyboardEvent | React.MouseEvent) => void;
  open?: boolean;
  memoStore: Directory;
  onClickMemo: (memo: Memo | null) => void;
  onClickDirectory: (id: string | null) => void;
  onCreate: ({
    parentId,
    index,
    type,
    parentNode,
  }: onCreateArgs) => IdObj | Promise<IdObj | null> | null;
};

export default function TreeViewHOC({
  className,
  onClose,
  onOpen,
  open,
  memoStore,
  onCreate,
  onClickDirectory,
  onClickMemo,
}: Props) {
  if (!memoStore) return null;

  const target = className.split(" ");

  if (target.includes("md:hidden") && onClose && onOpen && open) {
    return (
      <Drawer
        onClose={onClose}
        onOpen={onOpen}
        open={open}
        className={className}
      >
        <TreeView
          memoStore={memoStore}
          onCreate={onCreate}
          onClickDirectory={onClickDirectory}
          onClickMemo={onClickMemo}
        />
      </Drawer>
    );
  }

  if (target.includes("md:block")) {
    return (
      <TreeView
        memoStore={memoStore}
        className={className}
        onCreate={onCreate}
        onClickDirectory={onClickDirectory}
        onClickMemo={onClickMemo}
      />
    );
  }
}
