import { Suspense, lazy } from "react";
import TreeViewContextProvider from "../../context/TreeViewContext";
import TextEditorPlaceholder from "../placeholder/TextEditorPlaceholder";
import TreeViewPlaceholder from "../placeholder/TreeViewPlaceholder";
import useMemoes from "../../hooks/useMemoes";

const TextEditor = lazy(() => import("./TextEditor"));
const TreeViewHOC = lazy(() => import("./TreeViewHOC"));

export default function TreeViewContainer() {
  const { memo } = useMemoes();
  return (
    <TreeViewContextProvider>
      <>
        <Suspense fallback={<TreeViewPlaceholder className="md:hidden" />}>
          <TreeViewHOC className="md:hidden" />
        </Suspense>
        <div className="md:grow">
          <Suspense fallback={<TextEditorPlaceholder />}>
            <TextEditor memo={memo} />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <TreeViewPlaceholder className="hidden md:block md:w-[300px] md:ml-3" />
          }
        >
          <TreeViewHOC className="hidden md:block md:ml-3" />
        </Suspense>
      </>
    </TreeViewContextProvider>
  );
}
