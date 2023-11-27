import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import {
  Directory,
  Memo as MemoType,
  onCreateArgs,
  onDeleteArgs,
  onMoveArgs,
  onRenameArgs,
} from "../types/Memo.types";
import { useUserContext } from "../context/UserContext";
import { getAllMemoStoreQuery } from "../service/database/api";
import { useLiveQuery } from "dexie-react-hooks";
import TreeViewHOC from "../components/memo/TreeViewHOC";
import useMemoActions from "../hooks/useMemoActions";
import { LuFolderTree } from "react-icons/lu";
import { useAuthContext } from "../context/AuthContext";
import useMemoStore from "../hooks/useMemoStore";
import useMemoActionsInServer from "../hooks/useMemoActionsInServer";
import { AFTER_AUTH_KEY } from "../common/local-storage";

const TextEditor = lazy(() => import("../components/memo/TextEditor"));

export default function Memo() {
  const [isDrawerOpened, setDrawerOpened] = useState(false);

  const [memo, setMemo] = useState<MemoType | null>(null);
  const [directory, setDirectory] = useState<string | null>(null);

  const { tempUserId } = useUserContext();
  const { user } = useAuthContext();
  const { onCreate, onDelete, onMove, onRename } = useMemoActions(directory);
  const {
    onCreate: onCreateInServer,
    onDelete: onDeleteInServer,
    onMove: onMoveInServer,
    onRename: onRenameInServer,
  } = useMemoActionsInServer(directory);

  const memoStore = useLiveQuery(async () => {
    if (tempUserId) {
      const result = await getAllMemoStoreQuery(tempUserId);
      return result;
    }
  }, [tempUserId]) as Directory | undefined;

  const { uploadLocalMemoStoreToServer, memoStoreQuery } = useMemoStore();

  const initializeAppAfterFirstLogin = useCallback(() => {
    const afterAuth = localStorage.getItem(AFTER_AUTH_KEY);

    if (!afterAuth) {
      memoStore &&
        uploadLocalMemoStoreToServer.mutate(
          { memoStore },
          {
            onSuccess: () =>
              localStorage.setItem(AFTER_AUTH_KEY, AFTER_AUTH_KEY),
          }
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoStore]);

  useEffect(() => {
    if (user) {
      initializeAppAfterFirstLogin();
    }
  }, [initializeAppAfterFirstLogin, user]);

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

  const handleCreate = ({ type, ...args }: onCreateArgs) => {
    if (user) {
      onCreateInServer({ type, ...args });
      return null;
    }
    onCreate({ type, ...args });

    return null;
  };
  const handleDelete = ({ ids, nodes }: onDeleteArgs) => {
    if (user) {
      onDeleteInServer({ ids, nodes });
      return;
    }
    onDelete({ ids, nodes });
  };
  const handleRename = ({ id, name, node }: onRenameArgs) => {
    if (user) {
      onRenameInServer({ id, name, node });
      return;
    }
    onRename({ id, name, node });
  };
  const handleMove = ({
    dragIds,
    dragNodes,
    parentId,
    ...args
  }: onMoveArgs) => {
    if (user) {
      onMoveInServer({ dragIds, dragNodes, parentId, ...args });
      return;
    }
    onMove({ dragIds, dragNodes, parentId, ...args });
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
        onCreate={handleCreate}
        onDelete={handleDelete}
        onRename={handleRename}
        onMove={handleMove}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={isDrawerOpened}
        memoStore={memoStoreQuery.data || memoStore}
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
        memoStore={memoStoreQuery.data || memoStore}
      />
    </section>
  );
}
