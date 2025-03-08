import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  languages: string[];
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  lineCount: number;
  charCount: number;
}

export function Footer({ languages, currentLanguage, onLanguageChange, lineCount, charCount }: FooterProps) {
  return (
    <>
      <Separator className="bg-zinc-800" />
      <footer className="flex justify-between items-center bg-zinc-950 text-zinc-500 py-2 px-4 select-none fixed bottom-0 left-0 right-0">
        <p/>
        <div className="flex items-center">
          <p className="mr-4">Ln {lineCount}, Sym {charCount}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{currentLanguage}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {languages.map((language) => (
                  <DropdownMenuItem key={language} onClick={() => onLanguageChange(language)}>
                    {language}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </footer>
    </>
  );
}