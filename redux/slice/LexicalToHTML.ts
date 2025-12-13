import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes } from "@lexical/html";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";

// Check if string is Lexical JSON
const isLexicalJson = (value: string) => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return trimmed.startsWith("{") && trimmed.endsWith("}");
};

// Convert Lexical JSON to HTML
const lexicalJsonToHtml = (serializedState: string) => {
  if (!isLexicalJson(serializedState)) return serializedState;

  try {
    const editor = createHeadlessEditor({
      nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
    });

    const editorState = editor.parseEditorState(serializedState);
    editor.setEditorState(editorState);

    let html = "";
    editorState.read(() => {
      html = $generateHtmlFromNodes(editor);
    });

    return html;
  } catch (err) {
    console.error("Failed to parse Lexical JSON:", err);
    return "";
  }
};

type LexicalHtmlState = {
  cache: Record<string, string>;
};

const initialState: LexicalHtmlState = {
  cache: {},
};

const lexicalToHtmlSlice = createSlice({
  name: "lexicalToHtml",
  initialState,
  reducers: {
    convertLexicalToHtml: (
      state,
      action: PayloadAction<{ key: string; lexicalJson: string }>
    ) => {
      const { key, lexicalJson } = action.payload;
      if (!state.cache[key]) {
        state.cache[key] = lexicalJsonToHtml(lexicalJson);
      }
    },
    clearLexicalHtmlCache: (state) => {
      state.cache = {};
    },
  },
});

export const { convertLexicalToHtml, clearLexicalHtmlCache } =
  lexicalToHtmlSlice.actions;

export default lexicalToHtmlSlice.reducer;
