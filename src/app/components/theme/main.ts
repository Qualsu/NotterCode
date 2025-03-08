import { loader } from "@monaco-editor/react";
import { initializeGlowLang } from "./glowlang";

export const initializeMainTheme = async () => {
  const monaco = await loader.init();

  monaco.editor.defineTheme('notter-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#0B0B0C'
    }
  });

  await initializeGlowLang();
};