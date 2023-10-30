import { NodeApi } from "react-arborist";
import { Directory, Memo } from "../../../types/Memo.types";

type Props = {
  node: NodeApi<Memo | Directory>;
};

export default function NodeName({ node }: Props) {
  return (
    <>
      {node.isEditing ? (
        <input
          type="text"
          defaultValue={
            (node.data as Directory).name || (node.data as Memo).title
          }
          onFocus={(e) => e.currentTarget.select()}
          onBlur={() => node.reset()}
          onKeyDown={(e) => {
            if (e.key === "Escape") node.reset();
            if (e.key === "Enter") node.submit(e.currentTarget.value);
          }}
          autoFocus
        />
      ) : (
        <h3 className={``}>
          {(node.data as Directory).name || (node.data as Memo).title}
        </h3>
      )}
    </>
  );
}
