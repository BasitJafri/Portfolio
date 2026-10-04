import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownViewer.css';

interface MarkdownViewerProps {
  content: string;
  filePath: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, filePath }) => {
  const id = useMemo(
    () => `editor-panel-${filePath.replace(/\//g, '-')}`,
    [filePath]
  );

  return (
    <article
      id={id}
      className="markdown-viewer"
      role="tabpanel"
      aria-label={filePath}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // Disable raw HTML to prevent XSS
        disallowedElements={['html', 'script', 'style', 'iframe', 'object', 'embed']}
        unwrapDisallowed
        components={{
          // Open external links safely
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                {...(isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                {...props}
              >
                {children}
              </a>
            );
          },
          // Prevent inline HTML injection
          pre: ({ children }) => <pre className="md-pre">{children}</pre>,
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes('language-');
            return isBlock ? (
              <code className={`md-code-block ${className ?? ''}`} {...props}>
                {children}
              </code>
            ) : (
              <code className="md-code-inline" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
