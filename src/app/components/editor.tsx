"use client"

import React, { useEffect } from "react";
import { Editor, loader } from "@monaco-editor/react";
import { initializeMainTheme } from "./theme/main";

interface CodeEditorProps {
  content: string;
  fileName: string;
  language: string;
  onContentChange: (content: string) => void;
}

export function CodeEditor({ content, language, onContentChange }: CodeEditorProps) {
  useEffect(() => {
    initializeMainTheme();

    const codeElement = document.getElementById("code");
    if (codeElement) {
      loader.init().then(monaco => {
        monaco.editor.colorizeElement(codeElement, {});
      });
    }
  }, []);

  return (
    <Editor
      options={{
        minimap: {
          enabled: false,
        },
        wordWrap: 'on'
      }}
      theme="glowlang-theme"
      language={language}
      defaultValue=""
      value={content}
      onChange={(value) => onContentChange(value || '')}
      loading={null}
      className="editor flex-grow overflow-hidden"
    />
  );
}