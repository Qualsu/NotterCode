import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Code, X } from "lucide-react";

interface File {
  name: string;
  content: string;
  language?: string;
}

interface FilebarProps {
  files: File[];
  activeFile: File | null;
  onTabClick: (file: File) => void;
  onCloseTab: (file: File) => void;
  onNewFile: () => void;
}

export function Filebar({ files, activeFile, onTabClick, onCloseTab, onNewFile }: FilebarProps) {
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onNewFile();
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {files.length !== 0 && (
        <nav className="bg-zinc-950 text-zinc-500 py-1">
          <ul className="flex flex-row gap-2 ml-2 items-center">
            {files.map((file, index) => (
              <li key={index}>
                <Button
                  variant="outline"
                  className={`flex justify-center items-center flex-row group ${file === activeFile ? 'bg-primary/5' : ''}`}
                  onClick={() => onTabClick(file)}
                >
                  <Code />
                  {file.name}
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