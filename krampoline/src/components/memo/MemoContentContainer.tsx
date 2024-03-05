import { Suspense } from "react";
import TreeViewPlaceholder from "../placeholder/TreeViewPlaceholder";
import TextEditorContainer from "./text-editor/TextEditorContainer";
import { TreeView } from "./tree-view/exports/exports";

export default function MemoContentContainer() {
  return (
    <TreeView>
      <>
        <Suspense fallback={<TreeViewPlaceholder className="md:hidden" />}>
          <TreeView.HOC className="md:hidden" />
        </Suspense>
        <TextEditorContainer />
        <Suspense
          fallback={
            <TreeViewPlaceholder className="hidden md:block md:w-[300px] md:ml-3" />
          }
        >
          <TreeView.HOC className="hidden md:block md:ml-3" />
        </Suspense>
      </>
    </TreeView>
  );
}
