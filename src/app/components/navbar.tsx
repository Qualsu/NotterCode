import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "@/components/ui/theme-button";
import { Separator } from "@/components/ui/separator";
import { openFile } from '../utils/fileUtils';
import Image from 'next/image';
import NotterCodeMini from "../../../public/MiniLogo.png";

interface NavbarProps {
  onFileOpen: (content: string, fileName: string, type: string, size: number) => void;
  onNewFile: () => void;
  onSaveFile: () => void;
}

export function Navbar({ onFileOpen, onNewFile, onSaveFile }: NavbarProps) {
  const handleOpenFile = async () => {
    const { content, name, type, size } = await openFile();
    if (content) {
      onFileOpen(content, name, type, size);
    }
  };

  const handleSaveFile = () => {
    onSaveFile();
  };

  const handleUndo = () => {
    // Implement undo functionality
  };

  const handleRedo = () => {
    // Implement redo functionality
  };

  const handleCut = () => {
    // Implement cut functionality
  };

  const handleCopy = () => {
    // Implement copy functionality
  };

  const handlePaste = () => {
    // Implement paste functionality
  };

  const handleZoomIn = () => {
    document.body.style.zoom = `${parseFloat(document.body.style.zoom || '1') + 0.1}`;
  };

  const handleZoomOut = () => {
    document.body.style.zoom = `${parseFloat(document.body.style.zoom || '1') - 0.1}`;
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <nav className="bg-zinc-950 text-zinc-500 py-2 flex">
        <div className="flex items-center ml-2">
          <Image src={NotterCodeMini} alt="" width={30} height={30} className="object-contain" />
        </div>
        <Menubar className="flex flex-row gap-2 ml-2 items-center">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleOpenFile}>Open File</MenubarItem>
              <MenubarItem onClick={onNewFile}>New File</MenubarItem>
              <MenubarItem>Open Folder</MenubarItem>
              <MenubarItem onClick={handleSaveFile}>Save</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleUndo}>Undo</MenubarItem>
              <MenubarItem onClick={handleRedo}>Redo</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={handleCut}>Cut</MenubarItem>
              <MenubarItem onClick={handleCopy}>Copy</MenubarItem>
              <MenubarItem onClick={handlePaste}>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleZoomIn}>Zoom In</MenubarItem>
              <MenubarItem onClick={handleZoomOut}>Zoom Out</MenubarItem>
              <MenubarItem onClick={handleFullScreen}>Full Screen</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div className="ml-auto mr-3">
          <ModeToggle />
        </div>
      </nav>
      <Separator className="bg-zinc-800" />
    </>
  );
}