import { NodeApi } from "react-arborist";
import { Directory, Memo } from "../../../types/Memo.types";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

type Props = {
  node: NodeApi<Memo | Directory>;
};

export default function NodeToggleArrow({ node }: Props) {
  return (
    <div className={`mr-1`}>
      {node.data.type !== "memo" && node.isClosed ? (
        <MdOutlineKeyboardArrowRight />
      ) : node.data.type !== "memo" && !node.isClosed ? (
        <MdOutlineKeyboardArrowDown />
      ) : (
        ""
      )}
    </div>
  );
}
