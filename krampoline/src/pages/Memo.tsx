import { Suspense, lazy, useEffect, useState } from "react";
import { Memo as MemoType } from "../types/Memo.types";
import { useUserContext } from "../context/UserContext";
import TreeViewHOC from "../components/memo/TreeViewHOC";
import { LuFolderTree } from "react-icons/lu";
import { useAuthContext } from "../context/AuthContext";
import useMemoStore from "../hooks/useMemoStore";
import { initializeAppAfterFirstLogin } from "../utils/memo";
import useIndexedDBMemoStore from "../hooks/useIndexedDBMemoStore";
import TreeViewContextProvider from "../context/TreeViewContext";

const TextEditor = lazy(() => import("../components/memo/TextEditor"));

export default function Memo() {
  const [isDrawerOpened, setDrawerOpened] = useState(false);
  const [memo, setMemo] = useState<MemoType | null>(null);

  const { tempUserId } = useUserContext();
  const { user } = useAuthContext();

  const { memoStore } = useIndexedDBMemoStore(tempUserId);

  const { uploadLocalMemoStoreToServer, memoStoreQuery } = useMemoStore();

  useEffect(() => {
    if (user) {
      initializeAppAfterFirstLogin(
        memoStore,
        uploadLocalMemoStoreToServer.mutate
      );
    }
  }, [memoStore, user, uploadLocalMemoStoreToServer]);

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

  return (
    <section className="h-screen pt-3 md:pt-2 md:h-auto md:flex">
      <button
        onClick={toggleDrawer(!isDrawerOpened)}
        className="fixed z-20 bottom-28 left-5 md:hidden bg-violet-700 p-2 rounded-full"
      >
        <LuFolderTree className="text-white" />
      </button>
      <TreeViewContextProvider
        memoStore={memoStoreQuery.data || memoStore}
        onClickMemo={onClickMemo}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={isDrawerOpened}
      >
        <>
          <TreeViewHOC className="md:hidden" />
          <div className="md:grow">
            <Suspense fallback={<p>loading...</p>}>
              <TextEditor memo={memo} />
            </Suspense>
          </div>
          <TreeViewHOC className="hidden md:block md:ml-3" />
        </>
      </TreeViewContextProvider>
    </section>
  );
}
