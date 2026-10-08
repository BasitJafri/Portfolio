import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from 'react';
import './Terminal.css';
import { TerminalHistory } from '../../terminal/history';
import {
  executeCommand,
  getSuggestions,
  type TerminalLine,
} from '../../terminal/commands';
import { profile } from '../../data/profile';

interface TerminalProps {
  isVisible: boolean;
  onToggle: () => void;
}

const CV_PATH = '/resume/Abdul-Basit-Jafri.pdf';

function triggerCvDownload(): void {
  const a = document.createElement('a');
  a.href = CV_PATH;
  a.download = 'Abdul-Basit-Jafri-CV.pdf';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

interface SessionLine extends TerminalLine {
  id: number;
}

let lineIdCounter = 0;
function nextId(): number {
  return ++lineIdCounter;
}

const WELCOME: SessionLine[] = [
  { id: nextId(), type: 'output', text: `Welcome to ${profile.name}'s portfolio terminal.` },
  { id: nextId(), type: 'output', text: `Type 'help' for available commands.` },
];

const historyManager = new TerminalHistory();

export const Terminal: React.FC<TerminalProps> = ({ isVisible, onToggle }) => {
  const [lines, setLines] = useState<SessionLine[]>(WELCOME);
  const [input, setInput] = useState('');
  const [hint, setHint] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    if (isVisible) {
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [isVisible]);

  const appendLines = useCallback((newLines: TerminalLine[]) => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((l) => ({ ...l, id: nextId() })),
    ]);
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();

    appendLines([{ type: 'input', text: `$ ${trimmed || ' '}` }]);
    historyManager.push(trimmed);
    historyManager.resetCursor();
    setInput('');
    setHint('');

    if (!trimmed) return;

    const result = executeCommand(trimmed);

    switch (result.sideEffect) {
      case 'clear':
        setLines([]);
        return;
      case 'download-cv':
        appendLines(result.lines);
        triggerCvDownload();
        return;
      default:
        appendLines(result.lines);
    }
  }, [input, appendLines]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          handleSubmit();
          break;

        case 'ArrowUp':
          e.preventDefault();
          {
            const prev = historyManager.prev();
            if (prev !== null) {
              setInput(prev);
              setHint('');
            }
          }
          break;

        case 'ArrowDown':
          e.preventDefault();
          {
            const next = historyManager.next();
            if (next !== null) {
              setInput(next);
              setHint('');
            }
          }
          break;

        case 'Tab':
          e.preventDefault();
          {
            const suggestions = getSuggestions(input);
            if (suggestions.length === 1) {
              setInput(suggestions[0]);
              setHint('');
            } else if (suggestions.length > 1) {
              appendLines([{ type: 'output', text: suggestions.join('    ') }]);
            }
          }
          break;

        case 'l':
        case 'L':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setLines([]);
          }
          break;

        default:
          break;
      }
    },
    [handleSubmit, input, appendLines]
  );

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (!value) {
      setHint('');
      return;
    }
    const suggestions = getSuggestions(value);
    setHint(suggestions.length === 1 ? suggestions[0] : '');
  }, []);

  return (
    <div className={`terminal ${isVisible ? 'terminal--visible' : 'terminal--hidden'}`}>
      <div className="terminal__header">
        <span className="terminal__title">TERMINAL</span>
        <div className="terminal__header-actions">
          <span className="terminal__header-hint">portfolio shell v1.0</span>
          <button
            className="terminal__toggle"
            onClick={onToggle}
            aria-label={isVisible ? 'Collapse terminal' : 'Expand terminal'}
            title={isVisible ? 'Collapse' : 'Expand'}
          >
            {isVisible ? '▾' : '▴'}
          </button>
        </div>
      </div>

      {isVisible && (
        <div
          className="terminal__body"
          onClick={() => inputRef.current?.focus()}
          role="region"
          aria-label="Terminal output"
        >
          <div
            className="terminal__output"
            aria-live="polite"
            aria-relevant="additions"
            aria-atomic="false"
          >
            {lines.map((line) => {
              if (line.type === 'contact') {
                // Render: print( "..." )  with keyword + string coloring
                const match = line.text.match(/^(print)\((".*")\)$/);
                if (match) {
                  return (
                    <pre key={line.id} className="terminal__line terminal__line--contact">
                      <span className="terminal__kw">{match[1]}</span>
                      {'('}
                      <span className="terminal__str">{match[2]}</span>
                      {')'}
                    </pre>
                  );
                }
              }
              return (
                <pre key={line.id} className={`terminal__line terminal__line--${line.type}`}>
                  {line.text}
                </pre>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <div className="terminal__input-row">
            <span className="terminal__prompt" aria-hidden="true">
              {profile.name.split(' ')[0].toLowerCase()}@portfolio ~$
            </span>
            <input
              ref={inputRef}
              type="text"
              className="terminal__input"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
              placeholder={hint || undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};
