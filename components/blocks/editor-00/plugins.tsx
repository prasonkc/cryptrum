"use client"

import { useState } from "react"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"

// Core Lexical Plugins
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin"
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin"

// Shadcn-Editor UI Components/Plugins
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin"
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin"
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading"
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph"
import { ContentEditable } from "@/components/editor/editor-ui/content-editable"

import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin"
import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin"
import { FontBackgroundToolbarPlugin } from "@/components/editor/plugins/toolbar/font-background-toolbar-plugin"


export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      {/* 1. Toolbar Section */}
      <ToolbarPlugin>
        {() => (
          <div className="sticky top-0 z-10 flex gap-2 overflow-auto border-b bg-background p-1">
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
            </BlockFormatDropDown>
            
            {/* Standard Text Formatting (Bold, Italic, etc.) */}
            {/* <FontColorToolbarPlugin />
            <FontBackgroundToolbarPlugin /> */}
            
            {/* Alignment and Lists */}
            <ElementFormatToolbarPlugin />
          </div>
        )}
      </ToolbarPlugin>

      {/* 2. Editor Surface */}
      <div className="relative" ref={onRef}>
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor">
                <ContentEditable placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* 3. Logic Plugins*/}
        <HistoryPlugin />
        <CheckListPlugin />
        <TabIndentationPlugin />
        
      </div>
    </div>
  )
}