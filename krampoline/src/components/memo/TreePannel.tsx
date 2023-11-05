import { BsFileEarmarkPlus } from "react-icons/bs";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { onCreateArgs } from "../../types/Memo.types";
import { IdObj } from "react-arborist/dist/types/utils";

type Props = {
  onCreate: ({
    parentId,
    index,
    type,
    parentNode,
  }: onCreateArgs) => IdObj | Promise<IdObj | null> | null;
};

const buttonStyle =
  "bg-main-yellow p-1 rounded-full shadow-standard border-2 border-black active:shadow-none active:translate-x-1 active:translate-y-1";

export default function TreePannel({ onCreate }: Props) {
  return (
    <div className="bg-main-orange flex items-center justify-center px-1 py-2 mb-2 rounded-md border-2 border-black">
      <button
        type="button"
        className={`${buttonStyle} mr-3`}
        onClick={() =>
          onCreate({
            type: "leaf",
            parentId: "",
            index: -1,
            parentNode: null,
          })
        }
      >
        <BsFileEarmarkPlus className="text-lg" />
      </button>
      <button
        type="button"
        className={buttonStyle}
        onClick={() =>
          onCreate({
            type: "internal",
            parentId: "",
            index: -1,
            parentNode: null,
          })
        }
      >
        <AiOutlineFolderAdd className="text-xl" />
      </button>
    </div>
  );
}
