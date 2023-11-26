import { Directory, Memo, TreeNode } from "../types/Memo.types";

export function transformData(
  inputData: Directory | Memo,
  isDirectory: boolean = true
): TreeNode {
  let children: TreeNode[] = [];
  if (isDirectory) {
    inputData.type = "directory";
    const dirData = inputData as Directory;
    if (
      dirData.directories &&
      dirData.directories.length > 0 &&
      dirData.directories.filter((c) => c !== null).length > 0
    ) {
      children = children.concat(
        dirData.directories.map((dir) => transformData(dir, true))
      );
    }
    if (
      dirData.memos &&
      dirData.memos.length > 0 &&
      dirData.memos.filter((c) => c !== null).length > 0
    ) {
      children = children.concat(
        dirData.memos.map((memo) => transformData(memo, false))
      );
    }
  } else {
    inputData.type = "memo";
  }

  return {
    ...inputData,
    children: children.length > 0 ? children : undefined,
  };
}

export function detectOS() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Win")) return "Windows";
  if (userAgent.includes("Mac")) return "macOS";
  if (userAgent.includes("X11")) return "UNIX";
  if (userAgent.includes("Linux")) return "Linux";

  if (userAgent.includes("Android")) return "Android";
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";

  return "Unknown OS";
}
