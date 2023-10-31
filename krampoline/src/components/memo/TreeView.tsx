import { Tree } from "react-arborist";
import { Directory } from "../../types/Memo.types";
import { transformData } from "../../utils/memo";
import Node from "./node/Node";

type Props = {
  memoStore: Directory;
  className?: string;
};

export default function TreeView({ memoStore, className }: Props) {
  return (
    <>
      {memoStore && (
        <Tree
          data={(transformData(memoStore) as Directory).children}
          className={`${className}`}
        >
          {(props) => (
            <Node
              {...props}
              node={props.node}
              onClickFile={() => {}}
              onClickDirectory={() => {}}
            />
          )}
        </Tree>
      )}
    </>
  );
}
