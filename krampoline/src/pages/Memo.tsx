import { Suspense, lazy, useState } from "react";
import { Directory, Memo as MemoType } from "../types/Memo.types";
import { useUserContext } from "../context/UserContext";
import { getAllMemoStoreQuery } from "../service/database/api";
import { useLiveQuery } from "dexie-react-hooks";
import TreeViewHOC from "../components/memo/TreeViewHOC";
import useMemoActions from "../hooks/useMemoActions";
import { LuFolderTree } from "react-icons/lu";

const TextEditor = lazy(() => import("../components/memo/TextEditor"));

export default function Memo() {
  const [isDrawerOpened, setDrawerOpened] = useState(false);

  const [memo, setMemo] = useState<MemoType | null>(null);
  const [directory, setDirectory] = useState<string | null>(null);

  const { tempUserId } = useUserContext();
  const { onCreate, onDelete, onMove, onRename } = useMemoActions(directory);

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

  const onClickMemo = (memo: MemoType | null) => {
    setMemo(memo);
  };

  const onClickDirectory = (id: string | null) => {
    setDirectory(id);
  };

  return (
    <section className="h-screen pt-3 md:pt-2 md:h-auto md:flex">
      <button
        onClick={toggleDrawer(!isDrawerOpened)}
        className="fixed z-20 bottom-28 left-5 md:hidden bg-violet-700 p-2 rounded-full"
      >
        <LuFolderTree className="text-white" />
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
        memoStore={memoStore}
      />
      <div className="md:grow">
        <Suspense fallback={<p>loading...</p>}>
          <TextEditor memo={memo} />
        </Suspense>
      </div>
      <TreeViewHOC
        className="hidden md:block md:ml-3"
        onClickDirectory={onClickDirectory}
        onClickMemo={onClickMemo}
        onCreate={onCreate}
        onDelete={onDelete}
        onRename={onRename}
        onMove={onMove}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={isDrawerOpened}
        memoStore={memoStore}
      />
    </section>
  );
}
