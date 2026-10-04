import React from 'react';
import './EditorTabs.css';

interface EditorTabsProps {
  openFiles: string[];
  activeFile: string | null;
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
}

function getFilename(path: string): string {
  return path.split('/').pop() ?? path;
}

function getTabIcon(path: string): string {
  if (path.endsWith('.md')) return '📄';
  return '📄';
}

export const EditorTabs: React.FC<EditorTabsProps> = ({
  openFiles,
  activeFile,
  onTabClick,
  onTabClose,
}) => {
  if (openFiles.length === 0) return null;

  return (
    <div className="editor-tabs" role="tablist" aria-label="Open editor tabs">
      {openFiles.map((file) => {
        const isActive = file === activeFile;
        return (
          <div
            key={file}
            className={`editor-tabs__tab ${isActive ? 'editor-tabs__tab--active' : ''}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`editor-panel-${file.replace(/\//g, '-')}`}
          >
            <button
              className="editor-tabs__tab-btn"
              onClick={() => onTabClick(file)}
              title={file}
            >
              <span className="editor-tabs__tab-icon" aria-hidden="true">
                {getTabIcon(file)}
              </span>
              <span className="editor-tabs__tab-name">{getFilename(file)}</span>
            </button>
            <button
              className="editor-tabs__close"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(file);
              }}
              aria-label={`Close ${getFilename(file)}`}
              title={`Close ${getFilename(file)}`}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};
