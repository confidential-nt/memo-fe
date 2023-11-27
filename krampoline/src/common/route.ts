export const BASE_URL = "https://easylog.shop";

export const KakaoApiRoute = {
  LOGIN(code: string) {
    return BASE_URL + `/openApi/kakao?code=${code}`;
  },
};

export const MemoApiRoute = {
  ROOT_MEMO_STORE: BASE_URL + "/api/memo-stores2",
  ROOT_DIRECTORY: BASE_URL + "/api/directories",
  MEMOSTORE_SYNC: BASE_URL + "/api/memo-stores2/sync",
  ROOT_MEMO: BASE_URL + "/api/memos",
  DIRECTORY(directoryId: string) {
    return `/api/directories/${directoryId}`;
  },
  MEMO(memoId: string) {
    return `/api/memos/${memoId}`;
  },
  ADD_MEMO_TO_SUB_DIRECTORY(directoryId: string) {
    return `/api/memos/${directoryId}`;
  },
  MOVE_ROOT_MEMO_TO_DIRECTORY(memoId: string, targetDirectoryId: string) {
    return `/api/memos/${memoId}/${targetDirectoryId}`;
  },
  MOVE_MEMO_TO_DIRECTORY(
    memoId: string,
    parentDirectoryId: string,
    targetDirectoryId: string
  ) {
    return `/api/memos/${memoId}/${parentDirectoryId}/${targetDirectoryId}`;
  },
  MOVE_MEMO_TO_ROOT(memoId: string, parentDirectoryId: string) {
    return `/api/memos/${memoId}/${parentDirectoryId}/root/move`;
  },
  MOVE_ROOT_DIRECTORY_TO_DIRECTORY(
    directoryId: string,
    targetDirectoryId: string
  ) {
    return `/api/directories/${directoryId}/${targetDirectoryId}`;
  },
  MOVE_DIRECTORY_TO_DIRECTORY(
    directoryId: string,
    parentDirectoryId: string,
    targetDirectoryId: string
  ) {
    return `/api/directories/${parentDirectoryId}/${directoryId}/${targetDirectoryId}`;
  },
  MOVE_DiRECTORY_TO_ROOT(directoryId: string, parentDirectoryId: string) {
    return `/api/directories/${parentDirectoryId}/${directoryId}/move-root`;
  },
};

export const TodoApiRoute = {
  TO_DOS: BASE_URL + "/api/todos",
  TO_DO(todoId: string) {
    return BASE_URL + `/api/todos/${todoId}`;
  },
  TO_DO_IN_PROGRESS: BASE_URL + "/api/todos/in-progress",
  TO_DO_QUICK_INPUT: BASE_URL + "/api/input",
};
