export const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName.split('.').pop();
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'json':
      return 'json';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'cpp':
    case 'cc':
    case 'cxx':
    case 'c++':
    case 'hpp':
    case 'hxx':
    case 'h++':
      return 'cpp';
    case 'c':
    case 'h':
      return 'c';
    case 'cs':
      return 'csharp';
    case 'rb':
      return 'ruby';
    case 'go':
      return 'go';
    case 'rs':
      return 'rust';
    case 'php':
      return 'php';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
    case 'sass':
      return 'scss';
    case 'xml':
      return 'xml';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'md':
      return 'markdown';
    case 'sh':
      return 'shell';
    case 'bat':
      return 'bat';
    case 'ps1':
      return 'powershell';
    case 'swift':
      return 'swift';
    case 'kt':
      return 'kotlin';
    case 'dart':
      return 'dart';
    case 'r':
      return 'r';
    case 'pl':
      return 'perl';
    case 'lua':
      return 'lua';
    case 'sql':
      return 'sql';
    case 'vb':
    case 'vbs':
      return 'vb';
    case 'm':
      return 'objective-c';
    case 'ini':
    case 'cfg':
    case 'conf':
      return 'ini';
    case 'gl':
    case 'glow':
    case 'glang':
      return 'glowlang';
    default:
      return 'plaintext';
  }
};