export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  icon?: string;
}

export const PORTFOLIO_TREE: FileNode[] = [
  { name: 'README.md', type: 'file' },
  { name: 'about.md', type: 'file' },
  { name: 'experience.md', type: 'file' },
  { name: 'skills.md', type: 'file' },
  { name: 'education.md', type: 'file' },
  {
    name: 'projects',
    type: 'directory',
    children: [
      { name: 'README.md', type: 'file' },
    ],
  },
  { name: 'contact.md', type: 'file' },
  { name: 'terminal.md', type: 'file' },
];

export const ALL_FILES = [
  'README.md',
  'about.md',
  'experience.md',
  'skills.md',
  'education.md',
  'projects/README.md',
  'contact.md',
  'terminal.md',
] as const;

export type FilePath = typeof ALL_FILES[number];
