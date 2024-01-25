import { AuthenticatedUser } from "../types/Auth.types";
import {
  onCreateArgs,
  onDeleteArgs,
  onMoveArgs,
  onRenameArgs,
} from "../types/Memo.types";
import useMemoActions from "./useMemoActions";
import useMemoActionsInServer from "./useMemoActionsInServer";

export default function useAllActions(
  directory: string | null,
  user?: AuthenticatedUser | null
) {
  const { onCreate, onDelete, onMove, onRename } = useMemoActions(directory);
  const {
    onCreate: onCreateInServer,
    onDelete: onDeleteInServer,
    onMove: onMoveInServer,
    onRename: onRenameInServer,
  } = useMemoActionsInServer(directory);

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

  return {
    handleCreate,
    handleDelete,
    handleRename,
    handleMove,
  };
}
