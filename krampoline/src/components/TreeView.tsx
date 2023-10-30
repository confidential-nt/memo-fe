import { Tree } from "react-arborist";
import { Directory } from "../types/Memo.types";
import { transformData } from "../utils/memo";
import Node from "./Node";

type Props = {
  memoStore: Directory;
};

export default function TreeView({ memoStore }: Props) {
  return (
    <>
      {memoStore && (
        <Tree data={(transformData(memoStore) as Directory).children}>
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
