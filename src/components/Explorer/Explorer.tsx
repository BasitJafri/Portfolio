import React, { useState } from 'react';
import './Explorer.css';
import { PORTFOLIO_TREE, type FileNode } from '../../data/files';

interface ExplorerProps {
  openFiles: string[];
  activeFile: string | null;
  onFileOpen: (path: string) => void;
  isVisible: boolean;
}

/* ── VS Code–style file/folder icons ─────────────────────── */
const FolderOpenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1.5 3A1.5 1.5 0 000 4.5v8A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H7.621a.5.5 0 01-.354-.146L6.146 3.232A1.5 1.5 0 005.085 2.75H1.5z" fill="#dcb862"/>
  </svg>
);

const FolderClosedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 3.5A1.5 1.5 0 012.5 2h2.764c.958 0 1.76.56 2.108 1.362L7.5 4H13.5A1.5 1.5 0 0115 5.5v7a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 12.5v-9z" fill="#dcb862"/>
  </svg>
);

const MarkdownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect width="16" height="16" rx="2" fill="#519aba" opacity="0.15"/>
    <text x="2" y="12" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#519aba">MD</text>
  </svg>
);

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="explorer__chevron-icon">
    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="explorer__chevron-icon">
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface TreeNodeProps {
  node: FileNode;
  depth: number;
  prefix: string;
  openFiles: string[];
  activeFile: string | null;
  onFileOpen: (path: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node, depth, prefix, openFiles, activeFile, onFileOpen,
}) => {
  const [expanded, setExpanded] = useState(true);
  const path = prefix ? `${prefix}/${node.name}` : node.name;

  if (node.type === 'directory') {
    return (
      <li>
        <button
          className="explorer__row explorer__dir"
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          style={{ paddingLeft: `${6 + depth * 14}px` }}
        >
          <span className="explorer__chevron">
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </span>
          <span className="explorer__icon">
            {expanded ? <FolderOpenIcon /> : <FolderClosedIcon />}
          </span>
          <span className="explorer__label">{node.name}</span>
        </button>
        {expanded && node.children && (
          <ul className="explorer__list" role="group">
            {node.children.map(child => (
              <TreeNode
                key={child.name}
                node={child}
                depth={depth + 1}
                prefix={node.name}
                openFiles={openFiles}
                activeFile={activeFile}
                onFileOpen={onFileOpen}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const isActive = activeFile === path;
  const isOpen   = openFiles.includes(path);

  return (
    <li>
      <button
        className={`explorer__row explorer__file${isActive ? ' explorer__file--active' : ''}${isOpen ? ' explorer__file--open' : ''}`}
        onClick={() => onFileOpen(path)}
        aria-current={isActive ? 'page' : undefined}
        style={{ paddingLeft: `${6 + depth * 14 + 14}px` }}
        title={path}
      >
        <span className="explorer__icon"><MarkdownIcon /></span>
        <span className="explorer__label">{node.name}</span>
      </button>
    </li>
  );
};

export const Explorer: React.FC<ExplorerProps> = ({
  openFiles, activeFile, onFileOpen, isVisible,
}) => (
  <aside
    className={`explorer ${isVisible ? 'explorer--visible' : 'explorer--hidden'}`}
    aria-label="File Explorer"
    aria-hidden={!isVisible}
  >
    <div className="explorer__header">
      <span className="explorer__title">EXPLORER</span>
    </div>

    <div className="explorer__section">
      <button className="explorer__section-row" aria-expanded="true">
        <ChevronDown />
        <span className="explorer__section-label">PORTFOLIO</span>
      </button>
      <nav aria-label="Portfolio files">
        <ul className="explorer__list" role="tree">
          {PORTFOLIO_TREE.map(node => (
            <TreeNode
              key={node.name}
              node={node}
              depth={0}
              prefix=""
              openFiles={openFiles}
              activeFile={activeFile}
              onFileOpen={onFileOpen}
            />
          ))}
        </ul>
      </nav>
    </div>
  </aside>
);
