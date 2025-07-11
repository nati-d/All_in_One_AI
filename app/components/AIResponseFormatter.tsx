import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { isStabilityResponse, parseStabilityResponse, isElevenLabsResponse, parseElevenLabsResponse } from "../types/query";
import { ImageDisplay } from "./ImageDisplay";
import { AudioDisplay } from "./AudioDisplay";

// Global counter to ensure unique keys across all parsing functions
let globalKeyCounter = 0;

/**
 * Generates a unique key for React elements
 */
function generateUniqueKey(prefix: string): string {
  return `${prefix}-${Date.now()}-${++globalKeyCounter}`;
}

/**
 * Parses AI response text and converts common formatting patterns to JSX elements
 * Handles: **bold**, *italics*, `code`, ```code blocks```, headers, lists, images, audio, and other common AI formatting
 */
export function parseAIResponse(text: string, llmUsed?: string): React.ReactNode[] {
  if (!text) return [];
  
  // Check if this is a Stability AI response with image data
  if (llmUsed && isStabilityResponse(llmUsed)) {
    const stabilityData = parseStabilityResponse(text);
    if (stabilityData && stabilityData.image_base64) {
      return [
        <ImageDisplay
          key={generateUniqueKey('stability-image')}
          imageBase64={stabilityData.image_base64}
          seed={stabilityData.seed}
          finishReason={stabilityData.finish_reason}
        />
      ];
    }
  }

  // Check if this is an ElevenLabs response with audio data
  if (llmUsed && isElevenLabsResponse(llmUsed)) {
    const elevenLabsData = parseElevenLabsResponse(text);
    if (elevenLabsData && elevenLabsData.audio_base64) {
      return [
        <AudioDisplay
          key={generateUniqueKey('elevenlabs-audio')}
          audioBase64={elevenLabsData.audio_base64}
        />
      ];
    }
  }
  
  const parts: React.ReactNode[] = [];
  
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
      <CodeBlock key={generateUniqueKey('code')} code={codeBlockMatch[1]} />
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
      <div key={generateUniqueKey('numbered')} className="flex items-start gap-1 sm:gap-2 mb-0.5">
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
      <div key={generateUniqueKey('bullet')} className="flex items-start gap-1 sm:gap-2 mb-0.5">
        <span className="text-primary min-w-[1rem] sm:min-w-[1.5rem] text-sm sm:text-base">{bulletMatch[1]}</span>
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
      <code key={generateUniqueKey('inline-code')} className="bg-muted px-1 py-0.5 sm:px-1.5 rounded text-xs sm:text-sm font-mono border border-border text-foreground">
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
      <strong key={generateUniqueKey('bold')} className="font-semibold">
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
  let lastIndex = 0;
  
  // Handle italic (*text*)
  const italicRegex = /\*([^*]+)\*/g;
  let italicMatch;
  
  while ((italicMatch = italicRegex.exec(text)) !== null) {
    // Add text before italic
    if (italicMatch.index > lastIndex) {
      const beforeText = text.slice(lastIndex, italicMatch.index);
      parts.push(beforeText);
    }
    
    // Add italic text
    parts.push(
      <em key={generateUniqueKey('italic')} className="italic">
        {italicMatch[1]}
      </em>
    );
    
    lastIndex = italicMatch.index + italicMatch[0].length;
  }
  
  // Add remaining text after last italic
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    parts.push(remainingText);
  }
  
  return parts.length > 0 ? parts : [text];
}

/**
 * Parses headers (# ## ### etc.)
 */
function parseHeaders(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Handle headers (# ## ### etc.)
  const headerRegex = /^(#{1,6})\s+(.+)$/gm;
  let headerMatch;
  
  while ((headerMatch = headerRegex.exec(text)) !== null) {
    // Add text before header
    if (headerMatch.index > lastIndex) {
      const beforeText = text.slice(lastIndex, headerMatch.index);
      parts.push(...parseLists(beforeText));
    }
    
    // Determine header level
    const level = headerMatch[1].length;
    const HeaderTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
    
    // Add header
    parts.push(
      <HeaderTag key={generateUniqueKey('header')} className={`font-bold mb-2 mt-4 text-foreground ${
        level === 1 ? 'text-xl sm:text-2xl' :
        level === 2 ? 'text-lg sm:text-xl' :
        level === 3 ? 'text-base sm:text-lg' :
        'text-sm sm:text-base'
      }`}>
        {headerMatch[2]}
      </HeaderTag>
    );
    
    lastIndex = headerMatch.index + headerMatch[0].length;
  }
  
  // Add remaining text after last header
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    parts.push(...parseLists(remainingText));
  }
  
  const result = parts.length > 0 ? parts : parseLists(text);
  return combineTextElements(result);
}

/**
 * Combines consecutive text elements into single strings
 */
function combineTextElements(parts: React.ReactNode[]): React.ReactNode[] {
  const combined: React.ReactNode[] = [];
  let textBuffer = '';
  
  for (const part of parts) {
    if (typeof part === 'string') {
      textBuffer += part;
    } else {
      if (textBuffer) {
        combined.push(textBuffer);
        textBuffer = '';
      }
      combined.push(part);
    }
  }
  
  if (textBuffer) {
    combined.push(textBuffer);
  }
  
  return combined;
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
    <div className={`space-y-1 sm:space-y-2 ${className}`}>
      {parseAIResponse(text)}
    </div>
  );
} 