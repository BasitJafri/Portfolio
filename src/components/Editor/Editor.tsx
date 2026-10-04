import React from 'react';
import './Editor.css';
import { MarkdownViewer } from '../MarkdownViewer/MarkdownViewer';
import { EditorTabs } from '../EditorTabs/EditorTabs';
import { FILE_CONTENTS } from '../../data/content';

interface EditorProps {
  openFiles: string[];
  activeFile: string | null;
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
  openFiles,
  activeFile,
  onTabClick,
  onTabClose,
}) => {
  return (
    <section className="editor" aria-label="Editor">
      <EditorTabs
        openFiles={openFiles}
        activeFile={activeFile}
        onTabClick={onTabClick}
        onTabClose={onTabClose}
      />
      <div className="editor__content">
        {activeFile ? (
          <div className="editor__scroll">
            {openFiles.map((file) => (
              <div
                key={file}
                className={`editor__panel ${file === activeFile ? 'editor__panel--visible' : 'editor__panel--hidden'}`}
                aria-hidden={file !== activeFile}
              >
                <MarkdownViewer
                  content={FILE_CONTENTS[file] ?? `# Not Found\n\nFile \`${file}\` not found.`}
                  filePath={file}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="editor__welcome">
            <div className="editor__welcome-inner">
              <p className="editor__welcome-hint">
                Select a file from the Explorer to open it.
              </p>
              <p className="editor__welcome-shortcut">
                Or open the terminal below and type <code>ls</code>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
