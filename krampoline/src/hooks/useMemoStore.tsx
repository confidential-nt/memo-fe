import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import {
  getMemoStore,
  addRootDirectory as addRootDirectoryAPI,
  addRootMemo as addRootMemoAPI,
  deleteDirectory as deleteDirectoryAPI,
  deleteMemo as deleteMemoAPI,
  updateDirectory as updateDirectoryAPI,
  updateMemo as updateMemoAPI,
  addSubDirectory as addSubDirectoryAPI,
  addMemoToSubDirectory as addMemoToSubDirectoryAPI,
  moveRootMemoToDirectory as moveRootMemoToDirectoryAPI,
  moveMemoToDirectory as moveMemoToDirectoryAPI,
  moveMemoToRoot as moveMemoToRootAPI,
  moveRootDirectoryToDirectory as moveRootDirectoryToDirectoryAPI,
  moveDirectoryToDirectory as moveDirectoryToDirectoryAPI,
  moveDirectoryToRoot as moveDirectoryToRootAPI,
  uploadLocalMemoStoreToServer as uploadLocalMemoStoreToServerAPI,
} from "../service/http-requests/memo-api";
import { Directory } from "../types/Memo.types";

const baseQuery = "memoStore";

export default function useMemoStore() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const memoStoreQuery = useQuery({
    queryKey: [baseQuery, user?.email],
    queryFn: () => {
      getMemoStore();
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!user,
  });

  const addRootDirectory = useMutation({
    mutationFn: ({ name }: { name: string }) => addRootDirectoryAPI(name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  const addRootMemo = useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      addRootMemoAPI(title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  const addSubDirectory = useMutation({
    mutationFn: ({
      name,
      directoryId,
    }: {
      name: string;
      directoryId: string;
    }) => addSubDirectoryAPI(directoryId, name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  const addMemoToSubDirectory = useMutation({
    mutationFn: ({
      directoryId,
      title,
      content,
    }: {
      directoryId: string;
      title: string;
      content: string;
    }) => addMemoToSubDirectoryAPI(directoryId, title, content),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  const deleteDirectory = useMutation({
    mutationFn: ({ directoryId }: { directoryId: string }) =>
      deleteDirectoryAPI(directoryId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  const deleteMemo = useMutation({
    mutationFn: ({ memoId }: { memoId: string }) => deleteMemoAPI(memoId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  const updateDirectory = useMutation({
    mutationFn: ({
      name,
      directoryId,
    }: {
      name: string;
      directoryId: string;
    }) => updateDirectoryAPI(directoryId, name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  const updateMemo = useMutation({
    mutationFn: ({
      memoId,
      title,
      content,
    }: {
      memoId: string;
      title: string;
      content: string;
    }) => updateMemoAPI(memoId, title, content),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  const moveRootMemoToDirectory = useMutation({
    mutationFn: ({
      memoId,
      targetDirectoryId,
    }: {
      memoId: string;
      targetDirectoryId: string;
    }) => moveRootMemoToDirectoryAPI(memoId, targetDirectoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });
  const moveMemoToDirectory = useMutation({
    mutationFn: ({
      memoId,
      parentDirectoryId,
      targetDirectoryId,
    }: {
      memoId: string;
      parentDirectoryId: string;
      targetDirectoryId: string;
    }) => moveMemoToDirectoryAPI(memoId, parentDirectoryId, targetDirectoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });
  const moveMemoToRoot = useMutation({
    mutationFn: ({
      memoId,
      parentDirectoryId,
    }: {
      memoId: string;
      parentDirectoryId: string;
    }) => moveMemoToRootAPI(memoId, parentDirectoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });
  const moveRootDirectoryToDirectory = useMutation({
    mutationFn: ({
      directoryId,
      targetDirectoryId,
    }: {
      directoryId: string;
      targetDirectoryId: string;
    }) => moveRootDirectoryToDirectoryAPI(directoryId, targetDirectoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });
  const moveDirectoryToDirectory = useMutation({
    mutationFn: ({
      directoryId,
      parentDirectoryId,
      targetDirectoryId,
    }: {
      directoryId: string;
      parentDirectoryId: string;
      targetDirectoryId: string;
    }) =>
      moveDirectoryToDirectoryAPI(
        directoryId,
        parentDirectoryId,
        targetDirectoryId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });
  const moveDirectoryToRoot = useMutation({
    mutationFn: ({
      directoryId,
      parentDirectoryId,
    }: {
      directoryId: string;
      parentDirectoryId: string;
    }) => moveDirectoryToRootAPI(directoryId, parentDirectoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  const uploadLocalMemoStoreToServer = useMutation({
    mutationFn: ({ memoStore }: { memoStore: Directory }) =>
      uploadLocalMemoStoreToServerAPI(memoStore),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  return {
    memoStoreQuery,
    addRootDirectory,
    addRootMemo,
    addSubDirectory,
    addMemoToSubDirectory,
    deleteDirectory,
    deleteMemo,
    updateDirectory,
    updateMemo,
    moveRootMemoToDirectory,
    moveMemoToDirectory,
    moveMemoToRoot,
    moveRootDirectoryToDirectory,
    moveDirectoryToDirectory,
    moveDirectoryToRoot,
    uploadLocalMemoStoreToServer,
  };
}
