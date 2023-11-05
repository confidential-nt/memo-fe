import { Tree } from "react-arborist";
import {
  Directory,
  Memo,
  onCreateArgs,
  onDeleteArgs,
  onMoveArgs,
  onRenameArgs,
} from "../../types/Memo.types";
import { transformData } from "../../utils/memo";
import Node from "./node/Node";
import { IdObj } from "react-arborist/dist/types/utils";
import TreePannel from "./TreePannel";

const treeClassname = "tree";

type Props = {
  memoStore: Directory;
  className?: string;
  onClickMemo: (memo: Memo | null) => void;
  onClickDirectory: (id: string | null) => void;
  onCreate: ({
    parentId,
    index,
    type,
    parentNode,
  }: onCreateArgs) => IdObj | Promise<IdObj | null> | null;
  onDelete: ({ ids, nodes }: onDeleteArgs) => void;
  onRename: ({ id, name, node }: onRenameArgs) => void;
  onMove: ({
    dragIds,
    dragNodes,
    parentId,
    parentNode,
    index,
  }: onMoveArgs) => void;
};

export default function TreeView({
  memoStore,
  className,
  onCreate,
  onDelete,
  onRename,
  onMove,
  onClickDirectory,
  onClickMemo,
}: Props) {
  return (
    <>
      {memoStore && (
        <div>
          <TreePannel onCreate={onCreate} />
          <Tree
            data={(transformData(memoStore) as Directory).children}
            onCreate={onCreate}
            onDelete={onDelete}
            onRename={onRename}
            onMove={onMove}
            className={`${treeClassname} ${className}`}
            onClick={(e) => {
              if ((e.target as HTMLElement).classList.contains(treeClassname)) {
                onClickDirectory(null);
              }
            }}
          >
            {(props) => (
              <Node
                {...props}
                node={props.node}
                onClickMemo={onClickMemo}
                onClickDirectory={onClickDirectory}
              />
            )}
          </Tree>
        </div>
      )}
    </>
  );
}
