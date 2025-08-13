"use client";

import dynamic from "next/dynamic";
import { OnMount } from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";

// Dynamically import Monaco Editor to disable SSR
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeBlock({ code }: { code: string }) {
  const [language, setLanguage] = useState("typescript");
  const [editorHeight, setEditorHeight] = useState("90vh");
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Try to detect language from code content
    if (code.includes("import React") || code.includes("export default")) {
      setLanguage("typescript");
    } else if (code.includes("<html") || code.includes("<!DOCTYPE")) {
      setLanguage("html");
    } else if (code.includes("function") && code.includes("{")) {
      setLanguage("javascript");
    } else if (code.includes("const") && code.includes("=>")) {
      setLanguage("javascript");
    } else if (code.includes("class") && code.includes("extends")) {
      setLanguage("typescript");
    } else if (code.includes("#include")) {
      setLanguage("cpp");
    } else if (code.includes("def ") && code.includes(":")) {
      setLanguage("python");
    }
    
    // Adjust editor height based on screen size
    const updateHeight = () => {
      const isMobile = window.innerWidth < 768;
      setEditorHeight(isMobile ? "80vh" : "90vh");
    };
    
    // Set initial height
    updateHeight();
    
    // Add resize listener
    window.addEventListener('resize', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [code]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Set language based on detected language
    monaco.editor.setModelLanguage(editor.getModel()!, language);
    
    // Add better editor configuration
    editor.updateOptions({
      fontFamily: "'Consolas', 'Courier New', monospace",
      fontLigatures: true,
      fontSize: window.innerWidth < 768 ? 12 : 14,
    });
    
    // Ensure the editor gets focus when mounted
    setTimeout(() => {
      editor.layout();
    }, 100);
    
    // Create a custom theme with black and white colors
    monaco.editor.defineTheme('blackWhiteTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#000000',
        'editor.foreground': '#ffffff',
        'editorLineNumber.foreground': '#888888',
        'editorLineNumber.activeForeground': '#ffffff',
        'editor.selectionBackground': '#333333',
        'editor.lineHighlightBackground': '#1a1a1a',
      }
    });
    
    monaco.editor.setTheme('blackWhiteTheme');
    
    // Adjust editor for mobile
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      editor.updateOptions({
        fontSize: isMobile ? 12 : 14,
        minimap: { enabled: !isMobile },
        lineNumbers: isMobile ? "off" : "on",
      });
      editor.layout();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  return (
    <div className="w-full h-full" ref={containerRef}>
      <Editor
        height={editorHeight}
        theme="vs-dark"
        value={code}
        language={language}
        onMount={handleEditorDidMount}
        options={{
          readOnly: true,
          minimap: { enabled: true, scale: 0.75 },
          fontSize: 14,
          lineNumbers: "on",
          wordWrap: "on",
          wrappingIndent: "same",
          detectIndentation: true,
          scrollBeyondLastLine: false,
          scrollbar: {
            useShadows: true,
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            alwaysConsumeMouseWheel: false
          },
          renderLineHighlight: "all",
          automaticLayout: true,
          fixedOverflowWidgets: true,
        }}
      />
    </div>
  );
}
