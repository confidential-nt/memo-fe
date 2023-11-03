import TextEditor from "../components/memo/TextEditor";
import TreeView from "../components/memo/TreeView";
import { useState } from "react";
import { Directory, Memo as MemoType, onCreateArgs } from "../types/Memo.types";
import Drawer from "../components/memo/drawer/Drawer";
import { useUserContext } from "../context/UserContext";
import {
  addMemoToDirectory,
  addRootDirectory,
  addRootMemo,
  addSubDirectory,
  getAllMemoStoreQuery,
} from "../service/database/api";
import { useLiveQuery } from "dexie-react-hooks";

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

  const onClickMemo = (memo: MemoType | null) => {
    setMemo(memo);
  };

  const onClickDirectory = (id: string | null) => {
    setDirectory(id);
  };

  return (
    <section className="h-[calc(100%+105px)] overflow-hidden md:h-auto md:flex md:overflow-visible">
      {/* <button onClick={toggleDrawer(!isDrawerOpened)} className="md:hidden">
        toggle
      </button> */}
      <Drawer
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={isDrawerOpened}
        className="md:hidden"
      >
        <>
          {memoStore && (
            <TreeView
              memoStore={memoStore}
              onCreate={onCreate}
              onClickDirectory={onClickDirectory}
              onClickMemo={onClickMemo}
            />
          )}
        </>
      </Drawer>
      <div className="md:grow">
        <TextEditor />
      </div>
      <>
        {memoStore && (
          <TreeView
            memoStore={memoStore}
            className="hidden md:block md:ml-1"
            onCreate={onCreate}
            onClickDirectory={onClickDirectory}
            onClickMemo={onClickMemo}
          />
        )}
      </>
    </section>
  );
}
