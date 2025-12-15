"use client";

import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// Core Lexical Logic Plugins
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin"; // Required for CheckList

// Shadcn-Editor UI Components
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";

// Toolbar Detail Plugins
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin";
import { FontBackgroundToolbarPlugin } from "@/components/editor/plugins/toolbar/font-background-toolbar-plugin";
import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin";

import { Separator } from "@/components/ui/separator";

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative rounded-md border bg-popover text-popover-foreground shadow-sm">
      {/* Toolbar Section */}
      <ToolbarPlugin>
        {() => (
          <div className="sticky top-0 z-10 flex items-center gap-1 overflow-auto border-b bg-background p-1">
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
            </BlockFormatDropDown>

            <Separator orientation="vertical" className="mx-1 h-6" />

            <FontFamilyToolbarPlugin />
            <FontSizeToolbarPlugin />

            <Separator orientation="vertical" className="mx-1 h-6" />

            <FontFormatToolbarPlugin />
            <FontColorToolbarPlugin />
            <FontBackgroundToolbarPlugin />

            <Separator orientation="vertical" className="mx-1 h-6" />

            <ElementFormatToolbarPlugin />
          </div>
        )}
      </ToolbarPlugin>

      {/* Editor Surface */}
      <div className="relative min-h-[200px]" ref={onRef}>
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor px-4 py-2 focus:outline-none">
                <ContentEditable placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/*Functional Logic Plugins */}
        <HistoryPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <TabIndentationPlugin />
      </div>
    </div>
  );
}
