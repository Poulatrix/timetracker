import { useState, useEffect } from 'react';
import { Play, Square } from 'lucide-react';

interface TimerProps {
  onComplete: (duration: number) => void;
  isRunning: boolean;
  onToggle: () => void;
}

export function Timer({ onComplete, isRunning, onToggle }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (seconds > 0) {
      onComplete(seconds);
      setSeconds(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds, onComplete]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-6">
      <div className="text-5xl font-light tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
        {formatTime(seconds)}
      </div>
      <button
        onClick={onToggle}
        className="primary"
      >
        {isRunning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
    </div>
  );
}
