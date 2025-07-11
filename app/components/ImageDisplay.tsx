import React, { useState } from "react";
import { Copy, Check, Download, ImageIcon } from "lucide-react";

interface ImageDisplayProps {
  imageBase64: string;
  seed: string;
  finishReason: string;
}

export function ImageDisplay({ imageBase64, seed, finishReason }: ImageDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

  const copyToClipboard = async () => {
    try {
      // Create a blob from the base64 data and copy as image
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy image:', err);
      // Fallback: copy base64 string
      try {
        await navigator.clipboard.writeText(imageBase64);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy base64:', fallbackErr);
      }
    }
  };

  const downloadImage = () => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `stability-ai-image-${seed}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  return (
    <div className="my-2 rounded-lg overflow-hidden border border-border bg-card">
      {/* Header with image info and actions */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">Generated Image</span>
          <span className="text-xs text-muted-foreground">• Seed: {seed}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-accent"
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
          <button
            onClick={downloadImage}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-accent"
          >
            {downloaded ? (
              <>
                <Check className="w-3 h-3" />
                <span className="hidden sm:inline">Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3 h-3" />
                <span className="hidden sm:inline">Download</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Image content */}
      <div className="p-2 sm:p-4 bg-card">
        <img
          src={imageUrl}
          alt="Generated by Stability AI"
          className="w-full h-auto rounded-lg shadow-sm border border-border max-w-lg mx-auto block"
          style={{ maxHeight: '512px', objectFit: 'contain' }}
        />
        {finishReason !== 'SUCCESS' && (
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 p-2 rounded">
            Status: {finishReason}
          </div>
        )}
      </div>
    </div>
  );
} 