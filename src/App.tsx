import { useState, useCallback, useEffect } from 'react';
import './App.css';
import { ActivityBar } from './components/ActivityBar/ActivityBar';
import { Explorer } from './components/Explorer/Explorer';
import { Editor } from './components/Editor/Editor';
import { Terminal } from './components/Terminal/Terminal';
import { StatusBar } from './components/StatusBar/StatusBar';

type ActiveView = 'explorer' | 'terminal';

const DEFAULT_FILE = 'README.md';

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>('explorer');
  const [explorerVisible, setExplorerVisible] = useState(true);
  const [terminalVisible, setTerminalVisible] = useState(true);
  const [openFiles, setOpenFiles] = useState<string[]>([DEFAULT_FILE]);
  const [activeFile, setActiveFile] = useState<string | null>(DEFAULT_FILE);

  // Keyboard shortcut: Ctrl+B toggles sidebar, Ctrl+` toggles terminal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setExplorerVisible((v) => !v);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setTerminalVisible((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleFileOpen = useCallback((path: string) => {
    setOpenFiles((prev) =>
      prev.includes(path) ? prev : [...prev, path]
    );
    setActiveFile(path);
    // On mobile, collapse explorer after selecting a file
    if (window.innerWidth <= 640) {
      setExplorerVisible(false);
    }
  }, []);

  const handleTabClose = useCallback((path: string) => {
    setOpenFiles((prev) => {
      const next = prev.filter((f) => f !== path);
      if (activeFile === path) {
        setActiveFile(next[next.length - 1] ?? null);
      }
      return next;
    });
  }, [activeFile]);

  const handleTabClick = useCallback((path: string) => {
    setActiveFile(path);
  }, []);

  const handleViewChange = useCallback((view: ActiveView) => {
    if (view === 'terminal') {
      setTerminalVisible((v) => !v);
      return;
    }
    if (view === 'explorer' && activeView === 'explorer') {
      setExplorerVisible((v) => !v);
    } else {
      setActiveView(view);
      setExplorerVisible(true);
    }
  }, [activeView]);

  const handleTerminalToggle = useCallback(() => {
    setTerminalVisible((v) => !v);
  }, []);

  return (
    <div className="app">
      {/* Top workspace: activity bar + sidebar + editor */}
      <div className="app__workspace">
        <ActivityBar
          activeView={activeView}
          onViewChange={handleViewChange}
        />
        <Explorer
          openFiles={openFiles}
          activeFile={activeFile}
          onFileOpen={handleFileOpen}
          isVisible={explorerVisible}
        />
        <Editor
          openFiles={openFiles}
          activeFile={activeFile}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
        />
      </div>

      {/* Bottom: Terminal */}
      <Terminal
        isVisible={terminalVisible}
        onToggle={handleTerminalToggle}
      />

      {/* Status bar */}
      <StatusBar activeFile={activeFile} />
    </div>
  );
}
