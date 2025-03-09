import { FaJs, FaJava, FaPython, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTypescript, SiJson, SiPhp, SiRuby, SiGo, SiRust, SiMarkdown, SiShell, SiSwift, SiKotlin, SiDart, SiR, SiPerl, SiLua, SiSqlite, SiVim, SiCsharp, SiC, SiSass, SiPowershell } from 'react-icons/si';
import Image from 'next/image';
import GlowLangIcon from "../../../public/GlowLang.png"
import { Code2, File, Image as ImageIcon, Video } from "lucide-react";

export const acceptFileTypes: string = '.txt,.js,.jsx,.ts,.tsx,.json,.py,.java,.cpp,.c,.cs,.rb,.go,.rs,.php,.html,.css,.scss,.sass,.xml,.yaml,.yml,.md,.sh,.bat,.ps1,.swift,.kt,.dart,.r,.pl,.lua,.sql,.vb,.vbs,.m,.h,.hpp,.asm,.s,.ini,.cfg,.conf,.toml,.json5,.env,.env.local,.env.development,.env.test,.env.production,.env.local,.gl,.glow,.glang,.glowlang,.png,.jpg,.jpeg,.gif,.bmp,.tiff,.webp,.svg';

export const languages: string[] = [
  'plaintext', 'glowlang', 'javascript', 'typescript', 'json', 'python', 'java', 'cpp', 'c', 'csharp', 'ruby', 'go', 'rust', 'php', 'html', 'css', 'scss', 'xml', 'yaml', 'markdown', 'shell', 'bat', 'powershell', 'swift', 'kotlin', 'dart', 'r', 'perl', 'lua', 'sql', 'vb', 'objective-c', 'ini'
];

export const getIconForLanguage = (language: string | undefined) => {
  switch (language) {
    case 'javascript':
      return <FaJs />;
    case 'typescript':
      return <SiTypescript />;
    case 'json':
      return <SiJson />;
    case 'python':
      return <FaPython />;
    case 'java':
      return <FaJava />;
    case 'c':
    case 'cpp':
      return <SiC />;
    case 'csharp':
      return <SiCsharp />;
    case 'ruby':
      return <SiRuby />;
    case 'go':
      return <SiGo />;
    case 'rust':
      return <SiRust />;
    case 'php':
      return <SiPhp />;
    case 'html':
      return <FaHtml5 />;
    case 'css':
      return <FaCss3Alt />;
    case 'scss':
      return <SiSass />;
    case 'xml':
      return <Code2 />;
    case 'yaml':
      return <Code2 />;
    case 'markdown':
      return <SiMarkdown />;
    case 'shell':
      return <SiShell />;
    case 'powershell':
    case 'bat':
      return <SiPowershell />;
    case 'swift':
      return <SiSwift />;
    case 'kotlin':
      return <SiKotlin />;
    case 'dart':
      return <SiDart />;
    case 'r':
      return <SiR />;
    case 'perl':
      return <SiPerl />;
    case 'lua':
      return <SiLua />;
    case 'sql':
      return <SiSqlite />;
    case 'vb':
      return <SiVim />;
    case 'glowlang':
      return <Image src={GlowLangIcon} width={19} height={19} alt='' className="group-hover:brightness-200 duration-150 ease-in-out"/>;
    default:
      return <File />;
  }
};

export const getIconForFileType = (type: string | undefined) => {
  if (type?.startsWith('image/')) {
    return <ImageIcon />;
  }
  else if (type?.startsWith('video/')) {
    return <Video />;
  }
  return <File />;
};

export async function openFile(): Promise<{ content: string, name: string, type: string, size: number }> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptFileTypes;
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({ content: e.target?.result as string, name: file.name, type: file.type, size: file.size });
        };
        reader.onerror = (e) => { 
          reject(e);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });
}