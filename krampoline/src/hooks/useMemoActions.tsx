import { useUserContext } from "../context/UserContext";
import {
  addMemoToDirectory,
  addRootDirectory,
  addRootMemo,
  addSubDirectory,
  deleteDirectory,
  deleteMemo,
  moveDirectory,
  moveMemo,
  renameDirectory,
  renameMemo,
} from "../service/database/api";
import {
  onCreateArgs,
  onDeleteArgs,
  onMoveArgs,
  onRenameArgs,
} from "../types/Memo.types";

export default function useMemoActions(directory: string | null) {
  const { tempUserId } = useUserContext();

  const onCreate = ({ type }: onCreateArgs) => {
    if (directory && type === "internal") {
      addSubDirectory(directory);
    }

    if (directory && type === "leaf") {
      addMemoToDirectory(directory);
    }

    if (!directory && type === "internal") {
      tempUserId && addRootDirectory(tempUserId);
    }

    if (!directory && type === "leaf") {
      tempUserId && addRootMemo(tempUserId);
    }

    return null;
  };

  const onDelete = ({ ids, nodes }: onDeleteArgs) => {
    nodes.forEach((node, i) => {
      if (node.data.type === "directory") {
        deleteDirectory(ids[i]);
      } else {
        deleteMemo(ids[i]);
      }
    });
  };

  const onRename = ({ id, name, node }: onRenameArgs) => {
    if (node.data.type === "directory") {
      renameDirectory(name, id);
    } else {
      renameMemo(name, id);
    }
  };

  const onMove = ({ dragIds, dragNodes, parentId }: onMoveArgs) => {
    dragNodes.forEach((node, i) => {
      if (node.data.type === "directory") {
        moveDirectory(dragIds[i], parentId);
      } else {
        moveMemo(dragIds[i], parentId);
      }
    });
  };
  return {
    onCreate,
    onDelete,
    onRename,
    onMove,
  };
}
