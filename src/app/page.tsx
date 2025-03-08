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
import { File, Plus, Loader2 } from 'lucide-react';

interface File {
  name: string;
  content: string;
  language?: string;
}

export default function Home() {
  const [navWidth, setNavWidth] = useState(300);
  const [files, setFiles] = useState<File[]>(() => {
    if (typeof window !== 'undefined') {
      const savedFiles = localStorage.getItem('files');
      return savedFiles ? JSON.parse(savedFiles) : [];
    }
    return [];
  });
  const [activeFile, setActiveFile] = useState<File | null>(() => {
    if (typeof window !== 'undefined') {
      const savedActiveFile = localStorage.getItem('activeFile');
      return savedActiveFile ? JSON.parse(savedActiveFile) : null;
    }
    return null;
  });
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('files', JSON.stringify(files));
    }
  }, [files]);

  useEffect(() => {
    if (activeFile) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeFile', JSON.stringify(activeFile));
      }
      const lines = activeFile.content.split('\n').length;
      const chars = activeFile.content.length;
      setLineCount(lines);
      setCharCount(chars);
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('activeFile');
      }
    }
  }, [activeFile]);

  useEffect(() => {
    setLoading(false);
  }, []);

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

  const handleRenameFile = (oldName: string, newName: string, newLanguage: string) => {
    const updatedFiles = files.map(file =>
      file.name === oldName ? { ...file, name: newName, language: newLanguage } : file
    );
    setFiles(updatedFiles);
    if (activeFile && activeFile.name === oldName) {
      setActiveFile({ ...activeFile, name: newName, language: newLanguage });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loader2 size={64} className='animate-spin'/>
      </div>
    );
  }

  return (
    <>
      <Navbar onFileOpen={handleFileOpen} onNewFile={handleNewFile} onSaveFile={handleSaveFile} />
      <div className="flex flex-col bg-zinc-900/10 h-screen">
        <div className="flex flex-grow overflow-hidden">
          <Navigation width={navWidth} setWidth={setNavWidth} />
          <div className="flex-grow flex flex-col overflow-hidden">
            <Filebar files={files} activeFile={activeFile} onTabClick={handleTabClick} onCloseTab={handleCloseTab} onNewFile={handleNewFile} onRenameFile={handleRenameFile} />
            {files.length === 0 && (
              <div className="flex-grow flex flex-col items-center justify-center select-none">
                <Image src={Empty} alt="" width={400} />
                <div className='flex flex-row gap-4'>
                  <Button variant="ghost" onClick={handleNewFile}><Plus /> Create</Button>
                  <Button onClick={handleOpenFileClick}><File /> Open</Button>
                </div>
              </div>
            )}
            {activeFile && files.length > 0 && (
              <div className="flex-grow flex flex-col overflow-hidden">
                <CodeEditor content={activeFile.content} fileName={activeFile.name} language={activeFile.language || 'plaintext'} onContentChange={handleContentChange} />
              </div>
            )}
          </div>
        </div>
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