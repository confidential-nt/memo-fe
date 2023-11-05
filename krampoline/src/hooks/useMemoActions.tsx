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

type ActionType = "internal" | "leaf";

type ActionMap = {
  [key: string]:
    | ((parentDirectoryId: string) => Promise<void>)
    | ((userId: string) => "" | Promise<void> | undefined);
};

export default function useMemoActions(directory: string | null) {
  const { tempUserId } = useUserContext();

  const onCreate = ({ type }: onCreateArgs) => {
    const actionMap: ActionMap = {
      internal: directory
        ? addSubDirectory
        : (userId: string) => addRootDirectory(userId),
      leaf: directory
        ? addMemoToDirectory
        : (userId: string) => addRootMemo(userId),
    };

    if (type in actionMap) {
      const action = actionMap[type as ActionType];
      directory ? action(directory) : tempUserId ? action(tempUserId) : null;
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
