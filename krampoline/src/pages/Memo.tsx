import TextEditor from "../components/memo/TextEditor";
import TreeView from "../components/memo/TreeView";
import { useEffect, useState } from "react";
import axios from "axios";
import { Directory } from "../types/Memo.types";
import Drawer from "../components/memo/drawer/Drawer";

export default function Memo() {
  const [isDrawerOpened, setDrawerOpened] = useState(false);
  const [memoStore, setMemoStore] = useState<Directory>();

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

  useEffect(() => {
    axios.get("/data/memo.json").then((res) => setMemoStore(res.data));
  }, []);

  return (
    <section>
      <button onClick={toggleDrawer(!isDrawerOpened)}>toggle</button>
      <Drawer
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={isDrawerOpened}
      >
        <>{memoStore && <TreeView memoStore={memoStore} />}</>
      </Drawer>
      <TextEditor />
    </section>
  );
}
