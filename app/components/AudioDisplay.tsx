import React, { useState, useRef, useEffect } from "react";
import { Copy, Check, Download, Volume2, Play, Pause, RotateCcw } from "lucide-react";

interface AudioDisplayProps {
  audioBase64: string;
}

export function AudioDisplay({ audioBase64 }: AudioDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = `data:audio/mp3;base64,${audioBase64}`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const resetAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
    audio.pause();
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(audioBase64);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy audio base64:', err);
    }
  };

  const downloadAudio = () => {
    try {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `elevenlabs-audio-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      console.error('Failed to download audio:', err);
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="my-2 rounded-lg overflow-hidden border border-border bg-card">
      {/* Header with audio info and actions */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">Generated Audio</span>
          <span className="text-xs text-muted-foreground">• {formatTime(duration)}</span>
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
            onClick={downloadAudio}
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
      
      {/* Audio player content */}
      <div className="p-2 sm:p-4 bg-card">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        
        {/* Audio controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
            )}
          </button>

          {/* Reset button */}
          <button
            onClick={resetAudio}
            className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs text-muted-foreground min-w-[2.5rem]">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercentage}
                onChange={handleProgressChange}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${progressPercentage}%, hsl(var(--muted)) ${progressPercentage}%, hsl(var(--muted)) 100%)`
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground min-w-[2.5rem]">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 