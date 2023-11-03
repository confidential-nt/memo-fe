import TextEditor from "../components/memo/TextEditor";
import { useState } from "react";
import {
  Directory,
  Memo as MemoType,
  onCreateArgs,
  onDeleteArgs,
  onRenameArgs,
  onMoveArgs,
} from "../types/Memo.types";
import { useUserContext } from "../context/UserContext";
import {
  addMemoToDirectory,
  addRootDirectory,
  addRootMemo,
  addSubDirectory,
  deleteDirectory,
  deleteMemo,
  getAllMemoStoreQuery,
  moveDirectory,
  moveMemo,
  renameDirectory,
  renameMemo,
} from "../service/database/api";
import { useLiveQuery } from "dexie-react-hooks";
import TreeViewHOC from "../components/memo/TreeViewHOC";

export default function Memo() {
  const [isDrawerOpened, setDrawerOpened] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [memo, setMemo] = useState<MemoType | null>(null);
  const [directory, setDirectory] = useState<string | null>(null);

  const { tempUserId } = useUserContext();

  const memoStore = useLiveQuery(async () => {
    if (tempUserId) {
      const result = await getAllMemoStoreQuery(tempUserId);
      return result;
    }
  }, [tempUserId]) as Directory | undefined;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpened(open);
    };

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

  const onClickMemo = (memo: MemoType | null) => {
    setMemo(memo);
  };

  const onClickDirectory = (id: string | null) => {
    setDirectory(id);
  };

  return (
    <section className="h-[calc(100%+105px)] overflow-hidden md:h-auto md:flex md:overflow-visible">
      <button onClick={toggleDrawer(!isDrawerOpened)} className="md:hidden">
        toggle
      </button>
      <TreeViewHOC
        className="md:hidden"
        onClickDirectory={onClickDirectory}
        onClickMemo={onClickMemo}
        onCreate={onCreate}
        onDelete={onDelete}
        onRename={onRename}
        onMove={onMove}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={isDrawerOpened}
        memoStore={memoStore as Directory}
      />
      <div className="md:grow">
        <TextEditor />
      </div>
      <TreeViewHOC
        className="hidden md:block md:ml-1"
        onClickDirectory={onClickDirectory}
        onClickMemo={onClickMemo}
        onCreate={onCreate}
        onDelete={onDelete}
        onRename={onRename}
        onMove={onMove}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={isDrawerOpened}
        memoStore={memoStore as Directory}
      />
    </section>
  );
}
