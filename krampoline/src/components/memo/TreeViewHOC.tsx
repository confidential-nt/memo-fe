import Drawer from "./drawer/Drawer";
import TreeView from "./TreeView";
import { useTreeViewContext } from "../../context/TreeViewContext";

type Props = {
  className: string;
};

export default function TreeViewHOC({ className }: Props) {
  const { memoStore, onClose, onOpen, open } = useTreeViewContext();

  if (!memoStore) return null;

  if (className.includes("md:hidden") && onClose && onOpen && open) {
    return (
      <Drawer
        onClose={onClose}
        onOpen={onOpen}
        open={open}
        className={className}
      >
        <TreeView />
      </Drawer>
    );
  }

  if (className.includes("md:block")) {
    return <TreeView className={className} />;
  }
}
