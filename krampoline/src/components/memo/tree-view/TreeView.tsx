import { Tree } from "react-arborist";
import { Directory } from "../../../types/Memo.types";
import { transformData } from "../../../utils/memo";
import Node from "../node/Node";

import TreePannel from "./TreePannel";
import { useTreeViewContext } from "../../../context/TreeViewContext";

const treeClassname = "tree";

type Props = {
  className?: string;
};

export default function TreeView({ className }: Props) {
  const {
    memoStore,
    onClickMemo,
    onClickDirectory,
    onCreate,
    onDelete,
    onMove,
    onRename,
  } = useTreeViewContext();
  return (
    <>
      {memoStore && (
        <div className={className}>
          <TreePannel onCreate={onCreate} />
          <Tree
            data={(transformData(memoStore) as Directory).children}
            onCreate={onCreate}
            onDelete={onDelete}
            onRename={onRename}
            onMove={onMove}
            className={`${treeClassname}`}
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
