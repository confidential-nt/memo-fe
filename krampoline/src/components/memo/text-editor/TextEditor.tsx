import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { Memo } from "../../../types/Memo.types";
import { saveMemoContent as saveMemoContentInLocal } from "../../../service/database/api";
import { useAuthContext } from "../../../context/AuthContext";
import { AuthenticatedUser } from "../../../types/Auth.types";
import useMemoActionsInServer from "../../../hooks/useMemoActionsInServer";

const editorInitConfig = {
  height: "85vh",
  menubar: true,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks | " +
    "bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};

type Props = {
  memo: Memo | null;
};

export default function TextEditor({ memo }: Props) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const { user } = useAuthContext();
  const { onSaveMemoContent } = useMemoActionsInServer(null);
  const [dirty, setDirty] = useState(false);

  const saveMemoContent = (
    memoId: string,
    content: string,
    user?: AuthenticatedUser | null
  ) =>
    !user
      ? saveMemoContentInLocal(memoId, content)
      : onSaveMemoContent(memoId, content);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce(async (value: string, memo: Memo) => {
      await saveMemoContent(memo.id, value, user);
      setDirty(false);
    }, 1000),
    []
  );

  const handleChange = (value: string) => {
    if (editorRef.current && memo && memo.content != value) {
      setDirty(true);
      debouncedSave(editorRef.current.getContent(), memo);
    }
  };

  return (
    <>
      {dirty && <p>변경사항 저장 중.. 다른 곳으로 이동하지 마세요.</p>}
      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleChange}
        initialValue={memo ? memo.content : ""}
        init={editorInitConfig}
      />
    </>
  );
}
