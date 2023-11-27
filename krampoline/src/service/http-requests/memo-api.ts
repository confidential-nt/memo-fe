import axios from "axios";
import { MemoApiRoute } from "../../common/route";
import { Directory } from "../../types/Memo.types";

export async function addMemoStoreAfterFirstLogin() {
  return axios.post(MemoApiRoute.ROOT_MEMO_STORE).catch(console.log);
}

export async function getMemoStore() {
  return axios
    .get(MemoApiRoute.ROOT_MEMO_STORE)
    .then((res) => res.data)
    .catch(console.log);
}

export async function uploadLocalMemoStoreToServer(memoStore: Directory) {
  return axios.post(MemoApiRoute.MEMOSTORE_SYNC, memoStore);
}

export async function addRootDirectory(name: string = "새 폴더") {
  return axios.post(MemoApiRoute.ROOT_DIRECTORY, {
    name,
  });
}

export async function addRootMemo(
  title: string = "메모",
  content: string = ""
) {
  return axios.post(MemoApiRoute.ROOT_MEMO, {
    title,
    content,
  });
}
export async function deleteDirectory(directoryId: string) {
  return axios.delete(MemoApiRoute.DIRECTORY(directoryId));
}
export async function deleteMemo(memoId: string) {
  return axios.delete(MemoApiRoute.MEMO(memoId));
}
export async function updateDirectory(directoryId: string, name: string) {
  return axios.patch(MemoApiRoute.DIRECTORY(directoryId), {
    name,
  });
}
export async function renameMemo(memoId: string, title: string) {
  return axios.patch(MemoApiRoute.MEMO(memoId), {
    title,
  });
}

export async function updateMemoContent(memoId: string, content: string) {
  return axios.put(MemoApiRoute.MEMO(memoId), {
    content,
  });
}

export async function addSubDirectory(
  directoryId: string,
  name: string = "새 폴더"
) {
  return axios.post(MemoApiRoute.DIRECTORY(directoryId), {
    name,
  });
}
export async function addMemoToSubDirectory(
  directoryId: string,
  title: string = "메모",
  content: string = ""
) {
  return axios.post(MemoApiRoute.ADD_MEMO_TO_SUB_DIRECTORY(directoryId), {
    title,
    content,
  });
}

export async function moveRootMemoToDirectory(
  memoId: string,
  targetDirectoryId: string
) {
  return axios.put(
    MemoApiRoute.MOVE_ROOT_MEMO_TO_DIRECTORY(memoId, targetDirectoryId)
  );
}

export async function moveMemoToDirectory(
  memoId: string,
  parentDirectoryId: string,
  targetDirectoryId: string
) {
  return axios.put(
    MemoApiRoute.MOVE_MEMO_TO_DIRECTORY(
      memoId,
      parentDirectoryId,
      targetDirectoryId
    )
  );
}

export async function moveMemoToRoot(
  memoId: string,
  parentDirectoryId: string
) {
  return axios.put(MemoApiRoute.MOVE_MEMO_TO_ROOT(memoId, parentDirectoryId));
}

export async function moveRootDirectoryToDirectory(
  directoryId: string,
  targetDirectoryId: string
) {
  return axios.put(
    MemoApiRoute.MOVE_ROOT_DIRECTORY_TO_DIRECTORY(
      directoryId,
      targetDirectoryId
    )
  );
}

export async function moveDirectoryToDirectory(
  directoryId: string,
  parentDirectoryId: string,
  targetDirectoryId: string
) {
  return axios.put(
    MemoApiRoute.MOVE_DIRECTORY_TO_DIRECTORY(
      directoryId,
      parentDirectoryId,
      targetDirectoryId
    )
  );
}

export async function moveDirectoryToRoot(
  directoryId: string,
  parentDirectoryId: string
) {
  return axios.put(
    MemoApiRoute.MOVE_DiRECTORY_TO_ROOT(directoryId, parentDirectoryId)
  );
}
