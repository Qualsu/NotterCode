"use client"

import { useEffect } from "react";
import { Editor, loader } from "@monaco-editor/react";

export function CodeEditor(){
  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('notter-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#0f0f0f'
        }
      });

      monaco.languages.register({ id: "glowlang" });

      monaco.languages.setMonarchTokensProvider("glowlang", {
        tokenizer: {
          root: [
            [/\b(var|func|print|input|input_int|is_number|is_string|is_list|is_function|append|pop|len|clear|cls|run)\b/, "keyword"],
            [/\b(true|false|null|pi|e)\b/, "constant"],
            [/\b\d+(\.\d+)?\b/, "number"],
            [/".*?"/, "string"],
            [/\/\/.*/, "comment"],
            [/(->|[+\-*/^=<>!]+)/, "operator"],
            [/[()[\]{}]/, "delimiter"],
            [/\b\w+\b(?=\s*\()/, "function"],
            [/\b(if|elif|else|for|while|then|end|break|continue|return)\b/, "control-keyword"],
          ],
        },
      });

      monaco.editor.defineTheme("glowlang-theme", {
        base: "vs-dark", 
        inherit: true,
        rules: [
          { token: "keyword", foreground: "569CD6" },
          { token: "constant", foreground: "4EC9B0" },
          { token: "number", foreground: "B5CEA8" },
          { token: "string", foreground: "D69D85" },
          { token: "comment", foreground: "6A9955" },
          { token: "operator", foreground: "#cccccc" },
          { token: "delimiter", foreground: "D4D4D4" },
          { token: "function", foreground: "DCDCAA" },
          { token: "control-keyword", foreground: "C586C0" },
          { token: "variable", foreground: "9CDCFE" },
          { token: "parameter", foreground: "9CDCFE" },
          { token: "type", foreground: "4EC9B0" },
          { token: "error", foreground: "FF0000", fontStyle: "underline" },
        ],
        colors: {
          'editor.background': '#0f0f0f',
        },
      });

      monaco.languages.registerCompletionItemProvider("glowlang", {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };
          const suggestions = [
            {
              label: "var",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "var ",
              range: range,
            },
            {
              label: "func",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "func ${1:name}(${2:params}) {\n\t$0\n}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Function Definition",
              range: range,
            },
            {
              label: "if",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                "if (${1:condition}) then",
                "\t$0",
                "elif (${2:condition}) then",
                "\t",
                "else",
                "\t",
                "end",
              ].join("\n"),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "If-Else Statement",
              range: range,
            },
            {
              label: "for",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                "for ${1:var} = ${2:0} to ${3:count} then",
                "\t$0",
                "end",
              ].join("\n"),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "For Loop",
              range: range,
            },
            {
              label: "while",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                "while ${1:condition} then",
                "\t$0",
                "end",
              ].join("\n"),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "While Loop",
              range: range,
            },
            {
              label: "print",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "print(${1:text})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Print to console",
              range: range,
            },
            {
              label: "input",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "input(${1:prompt})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Get user input",
              range: range,
            },
            {
              label: "input_int",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "input_int(${1:prompt})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Get integer input from user",
              range: range,
            },
            {
              label: "is_number",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "is_number(${1:value})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Check if value is a number",
              range: range,
            },
            {
              label: "is_string",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "is_string(${1:value})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Check if value is a string",
              range: range,
            },
            {
              label: "is_list",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "is_list(${1:value})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Check if value is a list",
              range: range,
            },
            {
              label: "is_function",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "is_function(${1:value})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Check if value is a function",
              range: range,
            },
            {
              label: "append",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "append(${1:list}, ${2:value})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Append value to list",
              range: range,
            },
            {
              label: "pop",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "pop(${1:list}, ${2:index})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Remove element from list by index",
              range: range,
            },
            {
              label: "len",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "len(${1:list})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Get length of list",
              range: range,
            },
            {
              label: "clear",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "clear()",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Clear console",
              range: range,
            },
            {
              label: "cls",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "cls()",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Clear console",
              range: range,
            },
            {
              label: "run",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "run(${1:filename})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Run script",
              range: range,
            },
          ];
          return { suggestions: suggestions };
        },
      });

      const codeElement = document.getElementById("code");
      if (codeElement) {
        monaco.editor.colorizeElement(codeElement, {});
      }
    });
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
      language="glowlang"
      defaultValue="var a = 1\nprint(a)"
      value="var a = 1\nprint(a)"
      onChange={() => {}}
      loading={null}
    />
  );
}