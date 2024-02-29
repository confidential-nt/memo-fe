import { Suspense, lazy } from "react";
import TextEditorPlaceholder from "../../placeholder/TextEditorPlaceholder";
import useMemoes from "../../../hooks/useMemoes";

const TextEditor = lazy(() => import("./TextEditor"));

export default function TextEditorContainer() {
  const { memo } = useMemoes();
  return (
    <div className="md:grow">
      <Suspense fallback={<TextEditorPlaceholder />}>
        <TextEditor memo={memo} />
      </Suspense>
    </div>
  );
}
