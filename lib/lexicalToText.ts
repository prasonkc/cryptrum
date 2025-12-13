import { createHeadlessEditor } from "@lexical/headless";
import { $getRoot } from "lexical";

export const lexicalJsonToText = (serializedState: string) => {
  try {
    const editor = createHeadlessEditor();
    const editorState = editor.parseEditorState(serializedState);
    editor.setEditorState(editorState);

    let text = "";
    editorState.read(() => {
      text = $getRoot().getTextContent();
    });

    return text;
  } catch {
    return serializedState;
  }
};
