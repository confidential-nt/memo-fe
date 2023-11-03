import { Directory, Memo } from "../types/db.types";
import { db } from "./db";
import { v4 as uuid } from "uuid";

export async function initMemoStore(userId: string) {
  let existingMemoStore = await db.memoStores.get(userId);
  if (!existingMemoStore) {
    const newMemoStore = {
      id: userId,
    };
    existingMemoStore = newMemoStore;
    await db.memoStores.add(newMemoStore);
  }
}

export async function addRootDirectory(userId: string) {
  const directory: Directory = {
    id: uuid(),
    name: "",
    memoStoreId: userId,
    parentId: undefined,
  };
  await db.directories.add(directory);
}

export async function addRootMemo(userId: string) {
  const memo: Memo = {
    id: uuid(),
    title: "메모",
    content: "",
    memoStoreId: userId,
    directoryId: undefined,
  };

  await db.memos.add(memo);
}

export async function addSubDirectory(parentDirectoryId: string) {
  const parentDirectory = await db.directories.get(parentDirectoryId);

  if (parentDirectory) {
    const directory: Directory = {
      id: uuid(),
      name: "",
      parentId: parentDirectoryId,
      memoStoreId: parentDirectory.memoStoreId,
    };

    await db.directories.add(directory);
  }
}

export async function addMemoToDirectory(directoryId: string) {
  const directory = await db.directories.get(directoryId);

  if (directory) {
    const memo: Memo = {
      id: uuid(),
      title: "메모",
      content: "",
      directoryId: directoryId,
      memoStoreId: directory.memoStoreId,
    };

    await db.memos.add(memo);
  }
}

export async function deleteDirectory(directoryId: string) {
  await db.directories.delete(directoryId);
}
export async function deleteMemo(memoId: string) {
  await db.memos.delete(memoId);
}

export async function renameDirectory(name: string, directoryId: string) {
  await db.directories.update(directoryId, {
    name,
  });
}
export async function renameMemo(name: string, memoId: string) {
  await db.memos.update(memoId, {
    title: name,
  });
}

async function fetchAllFromDirectory(
  directoryId: string
): Promise<Directory | undefined> {
  const directory = await db.directories.get(directoryId);
  if (!directory) return;

  const subDirectories = await db.directories
    .where("parentId")
    .equals(directoryId)
    .toArray();
  const memos = await db.memos
    .where("directoryId")
    .equals(directoryId)
    .toArray();

  const resultSubDirectories = [];
  for (const subDir of subDirectories) {
    const deepStructure = await fetchAllFromDirectory(subDir.id);
    if (deepStructure) {
      resultSubDirectories.push(deepStructure);
    }
  }

  directory.directories = resultSubDirectories;
  directory.memos = memos;
  return directory;
}

async function fetchAllFromMemoStore(
  memoStoreId: string
): Promise<{ id: string; directories: Directory[]; memos: Memo[] }> {
  const rootDirectoriesData = await db.directories
    .where("memoStoreId")
    .equals(memoStoreId)
    .filter((directory) => !directory.parentId)
    .toArray();

  const rootMemos = await db.memos
    .where("memoStoreId")
    .equals(memoStoreId)
    .filter((memo) => !memo.directoryId)
    .toArray();

  const resultRootDirectories = [];
  for (const rootDir of rootDirectoriesData) {
    const deepStructure = await fetchAllFromDirectory(rootDir.id);
    if (deepStructure) {
      resultRootDirectories.push(deepStructure);
    }
  }

  return {
    id: memoStoreId,
    directories: resultRootDirectories,
    memos: rootMemos,
  };
}

export const getAllMemoStoreQuery = (userId: string) =>
  fetchAllFromMemoStore(userId);
