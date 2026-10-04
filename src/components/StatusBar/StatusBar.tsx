import React from 'react';
import './StatusBar.css';
import { profile } from '../../data/profile';

interface StatusBarProps {
  activeFile: string | null;
}

export const StatusBar: React.FC<StatusBarProps> = ({ activeFile }) => {
  const lang = activeFile?.endsWith('.md') ? 'Markdown' : activeFile?.endsWith('.pdf') ? 'PDF' : '';

  return (
    <footer className="status-bar" role="status" aria-label="Status bar">
      <div className="status-bar__left">
        <span className="status-bar__item status-bar__item--highlight">
          {profile.title}
        </span>
        <span className="status-bar__item">Java · Spring Boot</span>
        <span className="status-bar__item">Karachi</span>
      </div>
      <div className="status-bar__right">
        {lang && (
          <span className="status-bar__item">{lang}</span>
        )}
        {activeFile && (
          <span className="status-bar__item status-bar__item--muted">{activeFile}</span>
        )}
        <span className="status-bar__item">UTF-8</span>
      </div>
    </footer>
  );
};
