"use client"

import React, { useState, useEffect } from 'react';
import { CodeEditor } from "./components/editor";
import { Navigation } from "./components/navigation";
import { Navbar } from './components/navbar';
import { Filebar } from './components/filebar';
import { Footer } from './components/footer';
import { getLanguageFromFileName } from "./utils/languageUtils";
import { acceptFileTypes, languages } from './utils/fileUtils';
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import Empty from "../../public/Empty.png"
import { Button } from '@/components/ui/button';
import { File, Plus } from 'lucide-react';

interface File {
  name: string;
  content: string;
  language?: string;
}

export default function Home() {
  const [navWidth, setNavWidth] = useState(300);
  const [files, setFiles] = useState<File[]>(() => {
    const savedFiles = localStorage.getItem('files');
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const [activeFile, setActiveFile] = useState<File | null>(() => {
    const savedActiveFile = localStorage.getItem('activeFile');
    return savedActiveFile ? JSON.parse(savedActiveFile) : null;
  });
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    if (activeFile) {
      localStorage.setItem('activeFile', JSON.stringify(activeFile));
      const lines = activeFile.content.split('\n').length;
      const chars = activeFile.content.length;
      setLineCount(lines);
      setCharCount(chars);
    } else {
      localStorage.removeItem('activeFile');
    }
  }, [activeFile]);

  const handleFileOpen = (content: string, fileName: string) => {
    const newFile = { name: fileName, content, language: getLanguageFromFileName(fileName) };
    setFiles([...files, newFile]);
    setActiveFile(newFile);
  };

  const handleTabClick = (file: File) => {
    setActiveFile(file);
  };

  const handleCloseTab = (file: File) => {
    setFiles(files.filter(f => f !== file));
    if (activeFile === file) {
      setActiveFile(files.length > 0 ? files[0] : null);
    }
  };

  const getNextUntitledFileName = () => {
    let index = 1;
    while (files.some(file => file.name === `Untitled ${index}`)) {
      index++;
    }
    return `Untitled ${index}`;
  };

  const handleNewFile = () => {
    const newFile = { name: getNextUntitledFileName(), content: '', language: 'plaintext' };
    setFiles([...files, newFile]);
    setActiveFile(newFile);
  };

  const handleContentChange = (content: string) => {
    if (activeFile) {
      const updatedFiles = files.map(file =>
        file.name === activeFile.name ? { ...file, content } : file
      );
      setFiles(updatedFiles);
      setLineCount(content.split('\n').length);
      setCharCount(content.length);
    }
  };

  const handleLanguageChange = (language: string) => {
    if (activeFile) {
      const updatedFiles = files.map(file =>
        file.name === activeFile.name ? { ...file, language } : file
      );
      setFiles(updatedFiles);
      setActiveFile({ ...activeFile, language });
    }
  };

  const handleOpenFileClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptFileTypes;
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleFileOpen(e.target?.result as string, file.name);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleSaveFile = () => {
    if (activeFile) {
      const element = document.createElement('a');
      const file = new Blob([activeFile.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = activeFile.name;
      document.body.appendChild(element);
      element.click();
    }
  };

  return (
    <>
      <Navbar onFileOpen={handleFileOpen} onNewFile={handleNewFile} onSaveFile={handleSaveFile} />
      <div className="flex flex-col bg-zinc-900/10 h-screen">
        <div className="flex flex-grow">
          <Navigation width={navWidth} setWidth={setNavWidth} />
          <div className="flex-grow flex flex-col">
            <Filebar files={files} activeFile={activeFile} onTabClick={handleTabClick} onCloseTab={handleCloseTab} onNewFile={handleNewFile} />
            {!activeFile && (
              <div className="flex-grow flex flex-col items-center justify-center select-none mt-24">
                <Image src={Empty} alt="" width={400} />
                <div className='flex flex-row gap-4'>
                  <Button variant="ghost" onClick={handleNewFile}><Plus /> Create</Button>
                  <Button onClick={handleOpenFileClick}><File /> Open</Button>
                </div>
              </div>
            )}
            {activeFile && (
              <div className="flex-grow flex flex-col">
                <CodeEditor content={activeFile.content} fileName={activeFile.name} language={activeFile.language || 'plaintext'} onContentChange={handleContentChange} />
              </div>
            )}
          </div>
        </div>
        <Separator className="bg-zinc-800" />
        <Footer
          languages={languages}
          currentLanguage={activeFile?.language || 'plaintext'}
          onLanguageChange={handleLanguageChange}
          lineCount={lineCount}
          charCount={charCount}
        />
      </div>
    </>
  );
}