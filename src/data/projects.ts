export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  status: 'active' | 'archived' | 'planned';
  repo?: string;
  demo?: string;
}

/**
 * Add future projects here.
 * Each entry will automatically appear in the UI.
 *
 * Example:
 * {
 *   id: 'my-project',
 *   name: 'My Project',
 *   description: 'A brief description.',
 *   tech: ['Java', 'Spring Boot', 'PostgreSQL'],
 *   status: 'active',
 *   repo: 'https://github.com/yourusername/my-project',
 * }
 */
export const projects: Project[] = [
  // Projects will be added here.
];
