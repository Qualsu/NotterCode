import React, { useState, useRef } from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { getIconForLanguage, getIconForFileType } from '../utils/fileUtils';
import { getLanguageFromFileName } from '../utils/languageUtils';

interface File {
  name: string;
  content: string;
  language?: string;
  type?: string;
}

interface FilebarProps {
  files: File[];
  activeFile: File | null;
  onTabClick: (file: File) => void;
  onCloseTab: (file: File) => void;
  onNewFile: () => void;
  onRenameFile: (oldName: string, newName: string, newLanguage: string) => void;
}

export function Filebar({ files, activeFile, onTabClick, onCloseTab, onNewFile, onRenameFile }: FilebarProps) {
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState<string>('');
  const [newFileLanguage, setNewFileLanguage] = useState<string>('plaintext');
  const filebarRef = useRef<HTMLUListElement>(null);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onNewFile();
    }
  };

  const handleFileDoubleClick = (file: File) => {
    setRenamingFile(file.name);
    setNewFileName(file.name);
    setNewFileLanguage(file.language || 'plaintext');
  };

  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNewFileName(newName);
    setNewFileLanguage(getLanguageFromFileName(newName));
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newFileName.trim() !== '') {
        onRenameFile(renamingFile!, newFileName, newFileLanguage);
      }
      setRenamingFile(null);
    } else if (e.key === 'Escape') {
      setRenamingFile(null);
    }
  };

  const handleRenameBlur = () => {
    if (newFileName.trim() !== '') {
      onRenameFile(renamingFile!, newFileName, newFileLanguage);
    }
    setRenamingFile(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (filebarRef.current) {
      filebarRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {files.length !== 0 && (
        <nav className="bg-zinc-950 text-zinc-500 py-1" onWheel={handleWheel}>
          <ul className="flex flex-row gap-2 ml-2 items-center overflow-x-auto scrollbar-hide" ref={filebarRef}>
            {files.map((file, index) => (
              <li key={index}>
                <Button
                  variant="outline"
                  className={`flex justify-center items-center flex-row group ${file === activeFile ? 'bg-primary/5' : ''}`}
                  onClick={() => onTabClick(file)}
                  onDoubleClick={() => handleFileDoubleClick(file)}
                >
                    {renamingFile === file.name ? (
                    getIconForLanguage(newFileLanguage)
                    ) : (
                    file.type?.startsWith('image/') || file.type?.startsWith('video/') ? getIconForFileType(file.type) : getIconForLanguage(file.language)
                    )}
                  {renamingFile === file.name ? (
                    <input
                      type="text"
                      value={newFileName}
                      onChange={handleRenameChange}
                      onKeyDown={handleRenameKeyDown}
                      onBlur={handleRenameBlur}
                      autoFocus
                      className="bg-transparent border-none outline-none text-white"
                    />
                  ) : (
                    file.name
                  )}
                  <div className="hover:bg-primary/10 rounded-sm" onClick={(e) => { e.stopPropagation(); onCloseTab(file); }}>
                    <X className="invisible group-hover:visible" />
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <Separator className="bg-zinc-800" />
    </div>
  );
}