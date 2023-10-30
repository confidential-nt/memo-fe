import { NodeRendererProps } from "react-arborist";
import { Directory, Memo } from "../types/Memo.types";
import NodeToggleArrow from "./NodeToggleArrow";
import NodeName from "./NodeName";
import NodeIcon from "./NodeIcon";
import NodeActions from "./NodeActions";

type AdditionalNodeProps = {
  onClickFile: (file: Memo | null) => void;
  onClickDirectory: (id: string | null) => void;
};

export default function Node({
  node,
  style,
  tree,
  dragHandle,
  onClickFile,
  onClickDirectory,
}: NodeRendererProps<Memo | Directory> & AdditionalNodeProps) {
  const handleClick = () => {
    node.data.type === "directory" && node.toggle();
    if (node.data.type === "memo") {
      onClickFile(node.data as Memo);
      onClickDirectory(null);
    }
    if (node.data.type === "directory") {
      onClickDirectory(node.data.id);
    }
  };
  return (
    <div
      tabIndex={0}
      style={style}
      ref={dragHandle}
      onClick={handleClick}
      className={`group cursor-pointer hover:bg-main-mint
        ${node.state.isSelected ? `border font-bold border-black` : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <NodeToggleArrow node={node} />
          <NodeIcon node={node} />
          <NodeName node={node} />
        </div>
        <NodeActions node={node} tree={tree} />
      </div>
    </div>
  );
}
