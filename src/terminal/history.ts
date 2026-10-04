/** Bounded command history with cursor tracking. */
export class TerminalHistory {
  private entries: string[] = [];
  private cursor = -1;
  private readonly maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  push(command: string): void {
    if (!command.trim()) return;
    // De-duplicate consecutive identical entries
    if (this.entries[this.entries.length - 1] === command) {
      this.resetCursor();
      return;
    }
    if (this.entries.length >= this.maxSize) {
      this.entries.shift();
    }
    this.entries.push(command);
    this.resetCursor();
  }

  prev(): string | null {
    if (this.entries.length === 0) return null;
    if (this.cursor === -1) {
      this.cursor = this.entries.length - 1;
    } else if (this.cursor > 0) {
      this.cursor--;
    }
    return this.entries[this.cursor] ?? null;
  }

  next(): string | null {
    if (this.cursor === -1) return null;
    if (this.cursor < this.entries.length - 1) {
      this.cursor++;
      return this.entries[this.cursor];
    }
    this.cursor = -1;
    return '';
  }

  resetCursor(): void {
    this.cursor = -1;
  }

  getAll(): readonly string[] {
    return this.entries;
  }
}
