import { Suspense, lazy, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { LuFolderTree } from "react-icons/lu";
import { useAuthContext } from "../context/AuthContext";
import useMemoStore from "../hooks/useMemoStore";
import { initializeAppAfterFirstLogin } from "../utils/memo";
import useIndexedDBMemoStore from "../hooks/useIndexedDBMemoStore";
import TreeViewContextProvider from "../context/TreeViewContext";
import TextEditorPlaceholder from "../components/placeholder/TextEditorPlaceholder";
import TreeViewPlaceholder from "../components/placeholder/TreeViewPlaceholder";
import useMemoes from "../hooks/useMemoes";
import useDrawer from "../hooks/useDrawer";

const TextEditor = lazy(() => import("../components/memo/TextEditor"));
const TreeViewHOC = lazy(() => import("../components/memo/TreeViewHOC"));

export default function Memo() {
  const { tempUserId } = useUserContext();
  const { user } = useAuthContext();

  const { memo } = useMemoes();
  const { isDrawerOpened, toggleDrawer } = useDrawer();

  const { memoStore } = useIndexedDBMemoStore(tempUserId);

  const { uploadLocalMemoStoreToServer } = useMemoStore();

  useEffect(() => {
    if (user) {
      initializeAppAfterFirstLogin(
        memoStore,
        uploadLocalMemoStoreToServer.mutate
      );
    }
  }, [memoStore, user, uploadLocalMemoStoreToServer]);

  return (
    <section className="h-screen pt-3 md:pt-2 md:h-auto md:flex">
      <button
        onClick={toggleDrawer(!isDrawerOpened)}
        className="fixed z-20 bottom-28 left-5 md:hidden bg-violet-700 p-2 rounded-full"
      >
        <LuFolderTree className="text-white" />
      </button>
      <TreeViewContextProvider>
        <>
          <Suspense fallback={<TreeViewPlaceholder className="md:hidden" />}>
            <TreeViewHOC className="md:hidden" />
          </Suspense>
          <div className="md:grow">
            <Suspense fallback={<TextEditorPlaceholder />}>
              <TextEditor memo={memo} />
            </Suspense>
          </div>
          <Suspense
            fallback={
              <TreeViewPlaceholder className="hidden md:block md:w-[300px] md:ml-3" />
            }
          >
            <TreeViewHOC className="hidden md:block md:ml-3" />
          </Suspense>
        </>
      </TreeViewContextProvider>
    </section>
  );
}
