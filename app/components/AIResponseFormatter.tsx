import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * Parses AI response text and converts common formatting patterns to JSX elements
 * Handles: **bold**, *italics*, `code`, ```code blocks```, headers, lists, and other common AI formatting
 */
export function parseAIResponse(text: string): React.ReactNode[] {
  if (!text) return [];
  
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  
  // Split by code blocks first (```...```)
  const codeBlockRegex = /```([\s\S]*?)```/g;
  let codeBlockMatch;
  let lastIndex = 0;
  
  while ((codeBlockMatch = codeBlockRegex.exec(text)) !== null) {
    // Add text before code block
    if (codeBlockMatch.index > lastIndex) {
      const beforeText = text.slice(lastIndex, codeBlockMatch.index);
      parts.push(...parseHeaders(beforeText));
    }
    
    // Add code block with copy functionality
    parts.push(
      <CodeBlock key={`code-${currentIndex++}`} code={codeBlockMatch[1]} />
    );
    
    lastIndex = codeBlockMatch.index + codeBlockMatch[0].length;
  }
  
  // Add remaining text after last code block
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    parts.push(...parseHeaders(remainingText));
  }
  
  const result = parts.length > 0 ? parts : parseInlineFormatting(text);
  return combineTextElements(result);
}

/**
 * Parses numbered lists and bullet points
 */
function parseLists(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let lastIndex = 0;
  
  // Handle numbered lists (1. 2. 3. etc.)
  const numberedListRegex = /^(\d+\.\s+)(.+)$/gm;
  let numberedMatch;
  
  while ((numberedMatch = numberedListRegex.exec(text)) !== null) {
    // Add text before numbered list item
    if (numberedMatch.index > lastIndex) {
      const beforeText = text.slice(lastIndex, numberedMatch.index);
      parts.push(...parseInlineFormatting(beforeText));
    }
    
    // Add numbered list item
    parts.push(
      <div key={`numbered-${currentIndex++}`} className="flex items-start gap-1 sm:gap-2 mb-0.5">
        <span className="font-medium text-primary min-w-[1.5rem] sm:min-w-[2rem] text-sm sm:text-base">{numberedMatch[1]}</span>
        <span className="text-sm sm:text-base">{parseInlineFormatting(numberedMatch[2])}</span>
      </div>
    );
    
    lastIndex = numberedMatch.index + numberedMatch[0].length;
  }
  
  // Handle bullet points (- or •)
  const bulletListRegex = /^([•\-]\s+)(.+)$/gm;
  let bulletMatch;
  
  while ((bulletMatch = bulletListRegex.exec(text)) !== null) {
    // Add text before bullet point
    if (bulletMatch.index > lastIndex) {
      const beforeText = text.slice(lastIndex, bulletMatch.index);
      parts.push(...parseInlineFormatting(beforeText));
    }
    
    // Add bullet point
    parts.push(
      <div key={`bullet-${currentIndex++}`} className="flex items-start gap-1 sm:gap-2 mb-0.5">
        <span className="text-primary min-w-[1rem] sm:min-w-[1.5rem] text-sm sm:text-base">•</span>
        <span className="text-sm sm:text-base">{parseInlineFormatting(bulletMatch[2])}</span>
      </div>
    );
    
    lastIndex = bulletMatch.index + bulletMatch[0].length;
  }
  
  // Add remaining text after last list item
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    parts.push(...parseInlineFormatting(remainingText));
  }
  
  const result = parts.length > 0 ? parts : parseInlineFormatting(text);
  return combineTextElements(result);
}

/**
 * Parses inline formatting like **bold** and *italics*
 */
function parseInlineFormatting(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let lastIndex = 0;
  
  // Handle inline code (`code`)
  const inlineCodeRegex = /`([^`]+)`/g;
  let inlineCodeMatch;
  
  while ((inlineCodeMatch = inlineCodeRegex.exec(text)) !== null) {
    // Add text before inline code
    if (inlineCodeMatch.index > lastIndex) {
      const beforeText = text.slice(lastIndex, inlineCodeMatch.index);
      parts.push(...parseBoldAndItalic(beforeText));
    }
    
    // Add inline code
    parts.push(
      <code key={`inline-code-${currentIndex++}`} className="bg-muted px-1 py-0.5 sm:px-1.5 rounded text-xs sm:text-sm font-mono border border-border text-foreground">
        {inlineCodeMatch[1]}
      </code>
    );
    
    lastIndex = inlineCodeMatch.index + inlineCodeMatch[0].length;
  }
  
  // Add remaining text after last inline code
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    parts.push(...parseBoldAndItalic(remainingText));
  }
  
  const result = parts.length > 0 ? parts : parseBoldAndItalic(text);
  return combineTextElements(result);
}

/**
 * Parses bold (**text**) and italic (*text*) formatting
 */
function parseBoldAndItalic(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let lastIndex = 0;
  
  // Handle bold (**text**)
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let boldMatch;
  
  while ((boldMatch = boldRegex.exec(text)) !== null) {
    // Add text before bold
    if (boldMatch.index > lastIndex) {
      const beforeText = text.slice(lastIndex, boldMatch.index);
      parts.push(...parseItalic(beforeText));
    }
    
    // Add bold text
    parts.push(
      <strong key={`bold-${currentIndex++}`} className="font-semibold">
        {boldMatch[1]}
      </strong>
    );
    
    lastIndex = boldMatch.index + boldMatch[0].length;
  }
  
  // Add remaining text after last bold
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    parts.push(...parseItalic(remainingText));
  }
  
  const result = parts.length > 0 ? parts : parseItalic(text);
  return combineTextElements(result);
}

/**
 * Parses italic (*text*) formatting
 */
function parseItalic(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let lastIndex = 0;
  
  // Handle italic (*text*)
  const italicRegex = /\*([^*]+)\*/g;
  let italicMatch;
  
  while ((italicMatch = italicRegex.exec(text)) !== null) {
    // Add text before italic
    if (italicMatch.index > lastIndex) {
      parts.push(text.slice(lastIndex, italicMatch.index));
    }
    
    // Add italic text
    parts.push(
      <em key={`italic-${currentIndex++}`} className="italic">
        {italicMatch[1]}
      </em>
    );
    
    lastIndex = italicMatch.index + italicMatch[0].length;
  }
  
  // Add remaining text after last italic
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : [text];
}

/**
 * Combines consecutive text elements to reduce spacing
 */
function combineTextElements(elements: React.ReactNode[]): React.ReactNode[] {
  const combined: React.ReactNode[] = [];
  let currentText = '';
  
  for (const element of elements) {
    if (typeof element === 'string') {
      currentText += element;
    } else {
      // If we have accumulated text, add it first
      if (currentText) {
        combined.push(currentText);
        currentText = '';
      }
      combined.push(element);
    }
  }
  
  // Add any remaining text
  if (currentText) {
    combined.push(currentText);
  }
  
  return combined;
}

/**
 * Parses headers (### Header, ## Header, # Header)
 */
function parseHeaders(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let lastIndex = 0;
  
  // Handle headers (###, ##, #)
  const headerRegex = /^(#{1,6})\s+(.+)$/gm;
  let headerMatch;
  
  while ((headerMatch = headerRegex.exec(text)) !== null) {
    // Add text before header
    if (headerMatch.index > lastIndex) {
      const beforeText = text.slice(lastIndex, headerMatch.index);
      parts.push(...parseLists(beforeText));
    }
    
    // Determine header level and styling
    const level = headerMatch[1].length;
    const headerText = headerMatch[2];
    
    let headerElement;
    switch (level) {
      case 1:
        headerElement = <h1 key={`h1-${currentIndex++}`} className="text-xl sm:text-2xl font-bold text-foreground mt-2 mb-1">{parseInlineFormatting(headerText)}</h1>;
        break;
      case 2:
        headerElement = <h2 key={`h2-${currentIndex++}`} className="text-lg sm:text-xl font-semibold text-foreground mt-2 mb-1">{parseInlineFormatting(headerText)}</h2>;
        break;
      case 3:
        headerElement = <h3 key={`h3-${currentIndex++}`} className="text-base sm:text-lg font-semibold text-foreground mt-1 mb-1">{parseInlineFormatting(headerText)}</h3>;
        break;
      case 4:
        headerElement = <h4 key={`h4-${currentIndex++}`} className="text-sm sm:text-base font-medium text-foreground mt-1 mb-0.5">{parseInlineFormatting(headerText)}</h4>;
        break;
      case 5:
        headerElement = <h5 key={`h5-${currentIndex++}`} className="text-xs sm:text-sm font-medium text-foreground mt-1 mb-0.5">{parseInlineFormatting(headerText)}</h5>;
        break;
      case 6:
        headerElement = <h6 key={`h6-${currentIndex++}`} className="text-xs font-medium text-foreground mt-1 mb-0.5">{parseInlineFormatting(headerText)}</h6>;
        break;
      default:
        headerElement = <h3 key={`h3-${currentIndex++}`} className="text-base sm:text-lg font-semibold text-foreground mt-1 mb-1">{parseInlineFormatting(headerText)}</h3>;
    }
    
    parts.push(headerElement);
    lastIndex = headerMatch.index + headerMatch[0].length;
  }
  
  // Add remaining text after last header
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    parts.push(...parseLists(remainingText));
  }
  
  const result = parts.length > 0 ? parts : parseInlineFormatting(text);
  return combineTextElements(result);
}

/**
 * CodeBlock component with copy functionality
 */
interface CodeBlockProps {
  code: string;
}

function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="my-2 rounded-lg overflow-hidden border border-border bg-card">
      {/* Header with copy button */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-muted border-b border-border">
        <span className="text-xs text-muted-foreground font-medium">Code</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-accent"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code content */}
      <pre className="p-2 sm:p-4 overflow-x-auto bg-card">
        <code className="text-xs sm:text-sm text-foreground font-mono leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
}

/**
 * Component to render AI response with formatting
 */
interface AIResponseFormatterProps {
  text: string;
  className?: string;
}

export function AIResponseFormatter({ text, className = "" }: AIResponseFormatterProps) {
  return (
    <div className={`leading-none space-y-0 text-sm sm:text-base ${className}`}>
      {parseAIResponse(text)}
    </div>
  );
} 