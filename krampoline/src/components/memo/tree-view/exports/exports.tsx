import { lazy } from "react";

import TreeViewMain from "../TreeViewMain";

const TreeViewHOC = lazy(() => import("../TreeViewHOC"));

export const TreeView = Object.assign(TreeViewMain, {
  HOC: TreeViewHOC,
});
