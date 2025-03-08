export const acceptFileTypes: string = '.txt,.js,.jsx,.ts,.tsx,.json,.py,.java,.cpp,.c,.cs,.rb,.go,.rs,.php,.html,.css,.scss,.sass,.xml,.yaml,.yml,.md,.sh,.bat,.ps1,.swift,.kt,.dart,.r,.pl,.lua,.sql,.vb,.vbs,.m,.h,.hpp,.asm,.s,.ini,.cfg,.conf,.toml,.json5,.env,.env.local,.env.development,.env.test,.env.production,.env.local, .gl, .glow, .glang, .glowlang';

export const languages: string[] = [
  'plaintext', 'glowlang', 'javascript', 'typescript', 'json', 'python', 'java', 'cpp', 'c', 'csharp', 'ruby', 'go', 'rust', 'php', 'html', 'css', 'scss', 'xml', 'yaml', 'markdown', 'shell', 'bat', 'powershell', 'swift', 'kotlin', 'dart', 'r', 'perl', 'lua', 'sql', 'vb', 'objective-c', 'ini'
];

export async function openFile(): Promise<{ content: string, name: string }> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptFileTypes
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({ content: e.target?.result as string, name: file.name });
        };
        reader.onerror = (e) => { 
          reject(e);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  });
}