import { profile } from '../data/profile';
import { FILE_CONTENTS } from '../data/content';

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'contact';
  text: string;
}

/** All commands the terminal accepts. */
export const WHITELISTED_COMMANDS = [
  'help',
  'clear',
  'ls',
  'cat README.md',
  'cat about.md',
  'cat experience.md',
  'cat skills.md',
  'cat education.md',
  'cat contact.md',
  'cat terminal.md',
  'git pull cv',
  'git contact',
] as const;

export type Command = typeof WHITELISTED_COMMANDS[number];

const HELP_TEXT = `Available commands:

  help                 Show this help message
  clear                Clear the terminal
  ls                   List portfolio files

  cat README.md        View README
  cat about.md         View about
  cat experience.md    View experience
  cat skills.md        View skills
  cat education.md     View education
  cat contact.md       View contact
  cat terminal.md      View terminal guide

  git pull cv          Download CV / resume
  git contact          Show contact information`;

const LS_OUTPUT = `portfolio/
├── README.md
├── about.md
├── experience.md
├── skills.md
├── education.md
├── projects/
│   └── README.md
├── contact.md
└── terminal.md`;

const UNKNOWN_COMMAND_SUFFIX = `\nThis terminal only supports portfolio commands.\nType 'help' for available commands.`;

/**
 * Parse and execute a terminal command.
 * Returns the output lines and optional side effect.
 */
export function executeCommand(
  raw: string
): {
  lines: TerminalLine[];
  sideEffect?: 'download-cv' | 'clear';
} {
  // Normalize: trim, collapse internal spaces
  const input = raw.trim().replace(/\s+/g, ' ');

  if (!input) return { lines: [] };

  switch (input) {
    case 'help':
      return {
        lines: [{ type: 'output', text: HELP_TEXT }],
      };

    case 'clear':
      return { lines: [], sideEffect: 'clear' };

    case 'ls':
      return {
        lines: [{ type: 'output', text: LS_OUTPUT }],
      };

    case 'cat README.md':
    case 'cat about.md':
    case 'cat experience.md':
    case 'cat skills.md':
    case 'cat education.md':
    case 'cat contact.md':
    case 'cat terminal.md': {
      const filename = input.slice(4).trim();
      const content = FILE_CONTENTS[filename];
      if (content) {
        return { lines: [{ type: 'output', text: content }] };
      }
      return {
        lines: [{ type: 'error', text: `error: file not found: ${filename}` }],
      };
    }

    case 'git pull cv':
      return {
        lines: [
          { type: 'info',    text: 'Fetching CV...' },
          { type: 'success', text: '✓ CV located' },
          { type: 'success', text: '✓ Preparing download...' },
          { type: 'success', text: '✓ Download ready' },
        ],
        sideEffect: 'download-cv',
      };

    case 'git contact':
      return {
        lines: [
          { type: 'contact', text: `print("phone    : ${profile.phone}")` },
          { type: 'contact', text: `print("email    : ${profile.email}")` },
          { type: 'contact', text: `print("linkedin : ${profile.linkedin}")` },
        ],
      };

    default: {
      const suggestions = getSuggestions(input);
      const hint =
        suggestions.length > 0
          ? `\nDid you mean:\n${suggestions.map((s) => `  ${s}`).join('\n')}`
          : '';
      return {
        lines: [
          {
            type: 'error',
            text: `error: command not found: '${input}'${hint}${UNKNOWN_COMMAND_SUFFIX}`,
          },
        ],
      };
    }
  }
}

/** Return autocomplete suggestions for the current input prefix. */
export function getSuggestions(partial: string): string[] {
  if (!partial) return [];
  const lower = partial.toLowerCase();
  return WHITELISTED_COMMANDS.filter((cmd) =>
    cmd.toLowerCase().startsWith(lower)
  );
}
