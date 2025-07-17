"use client";

import dynamic from "next/dynamic";
import { OnMount } from "@monaco-editor/react";

// Dynamically import Monaco Editor to disable SSR
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeBlock({ code }: { code: string }) {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monaco.editor.setModelLanguage(editor.getModel()!, "typescript");
  };

  return (
    <Editor
      height="90vh"
      theme="vs-dark"
      value={code}
      onMount={handleEditorDidMount}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        wordWrap: "on",
        wrappingIndent: "same",
        detectIndentation: true,
        scrollBeyondLastLine: false,
      }}
    />
  );
}
