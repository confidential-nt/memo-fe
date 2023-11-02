import { Tree } from "react-arborist";
import { Directory, Memo, onCreateArgs } from "../../types/Memo.types";
import { transformData } from "../../utils/memo";
import Node from "./node/Node";
import { IdObj } from "react-arborist/dist/types/utils";

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
};

export default function TreeView({
  memoStore,
  className,
  onCreate,
  onClickDirectory,
  onClickMemo,
}: Props) {
  return (
    <>
      {memoStore && (
        <Tree
          data={(transformData(memoStore) as Directory).children}
          onCreate={onCreate}
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
      )}
    </>
  );
}
