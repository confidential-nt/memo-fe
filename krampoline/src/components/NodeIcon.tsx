import { NodeApi } from "react-arborist";
import { Directory, Memo } from "../types/Memo.types";
import { AiOutlineFolder } from "react-icons/ai";
import { PiNotepadLight } from "react-icons/pi";

type Props = {
  node: NodeApi<Memo | Directory>;
};

export default function NodeIcon({ node }: Props) {
  return (
    <div className={`mr-1 `}>
      {node.data.type === "memo" ? <PiNotepadLight /> : <AiOutlineFolder />}{" "}
    </div>
  );
}
