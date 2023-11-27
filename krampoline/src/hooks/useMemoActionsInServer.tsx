import {
  onCreateArgs,
  onDeleteArgs,
  onMoveArgs,
  onRenameArgs,
} from "../types/Memo.types";
import useMemoStore from "./useMemoStore";

type ActionType = "internal" | "leaf";

type ActionMap = {
  [key in ActionType]: () => void;
};

export default function useMemoActionsInServer(directory: string | null) {
  const {
    addRootDirectory,
    addSubDirectory,
    addRootMemo,
    addMemoToSubDirectory,
    deleteDirectory,
    deleteMemo,
    updateDirectory,
    renameMemo,
    updateMemoContent,
    moveDirectoryToDirectory,
    moveDirectoryToRoot,
    moveRootDirectoryToDirectory,
    moveMemoToDirectory,
    moveMemoToRoot,
    moveRootMemoToDirectory,
  } = useMemoStore();

  const onCreate = ({ type }: onCreateArgs) => {
    const actionMap: ActionMap = {
      internal: directory
        ? () =>
            addSubDirectory.mutate({ name: "새 폴더", directoryId: directory })
        : () => addRootDirectory.mutate({ name: "새 폴더" }),
      leaf: directory
        ? () =>
            addMemoToSubDirectory.mutate({
              directoryId: directory,
              title: "메모",
              content: "",
            })
        : () => addRootMemo.mutate({ title: "메모", content: "" }),
    };

    if (type in actionMap) {
      const action = actionMap[type as ActionType];
      action();
    }

    return null;
  };

  const onDelete = ({ ids, nodes }: onDeleteArgs) => {
    nodes.forEach((node, i) => {
      if (node.data.type === "directory") {
        deleteDirectory.mutate({ directoryId: ids[i] });
      } else {
        deleteMemo.mutate({ memoId: ids[i] });
      }
    });
  };

  const onRename = ({ id, name, node }: onRenameArgs) => {
    if (node.data.type === "directory") {
      updateDirectory.mutate({ name, directoryId: id });
    } else {
      renameMemo.mutate({ memoId: id, title: name });
    }
  };

  const onSaveMemoContent = (memoId: string, content: string) => {
    updateMemoContent.mutate({ memoId, content });
  };

  const moveDirectory = (
    directoryId: string,
    parentDirectoryId?: string,
    targetDirectoryId?: string | null
  ) => {
    if (
      parentDirectoryId === "__REACT_ARBORIST_INTERNAL_ROOT__" &&
      targetDirectoryId
    ) {
      moveRootDirectoryToDirectory.mutate({
        directoryId,
        targetDirectoryId,
      });
      return;
    }

    if (parentDirectoryId && targetDirectoryId)
      moveDirectoryToDirectory.mutate({
        directoryId,
        parentDirectoryId,
        targetDirectoryId,
      });
    if (parentDirectoryId && !targetDirectoryId)
      moveDirectoryToRoot.mutate({
        directoryId,
        parentDirectoryId,
      });
  };

  const moveMemo = (
    memoId: string,
    parentDirectoryId?: string,
    targetDirectoryId?: string | null
  ) => {
    if (
      parentDirectoryId === "__REACT_ARBORIST_INTERNAL_ROOT__" &&
      targetDirectoryId
    ) {
      moveRootMemoToDirectory.mutate({
        memoId,
        targetDirectoryId,
      });
      return;
    }

    if (parentDirectoryId && targetDirectoryId) {
      moveMemoToDirectory.mutate({
        memoId,
        parentDirectoryId,
        targetDirectoryId,
      });
    }
    if (parentDirectoryId && !targetDirectoryId) {
      moveMemoToRoot.mutate({ memoId, parentDirectoryId });
    }
  };

  const onMove = ({ dragIds, dragNodes, parentId }: onMoveArgs) => {
    dragNodes.forEach((node, i) => {
      const parentDirectoryId = dragNodes[i].parent?.id;
      const targetDirectoryId = parentId;
      if (node.data.type === "directory") {
        moveDirectory(dragIds[i], parentDirectoryId, targetDirectoryId);
      } else {
        moveMemo(dragIds[i], parentDirectoryId, targetDirectoryId);
      }
    });
  };
  return {
    onCreate,
    onDelete,
    onRename,
    onMove,
    onSaveMemoContent,
  };
}
