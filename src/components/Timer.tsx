import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const DURATION = 120;

export function Timer() {
  const [seconds, setSeconds] = useState(DURATION);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running, seconds]);

  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(DURATION);
  }, []);

  const toggle = () => setRunning((r) => !r);

  const pct = (seconds / DURATION) * 100;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isLow = seconds <= 30;

  const circumference = 2 * Math.PI * 44;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-28 w-28 items-center justify-center">
        {/* Glow behind ring */}
        {running && (
          <div
            className={`absolute inset-2 rounded-full blur-xl transition-colors duration-500 ${
              isLow ? "bg-destructive/20" : "bg-primary/15"
            } animate-glow-pulse`}
          />
        )}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--secondary))" strokeWidth="4" />
          <defs>
            <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isLow ? "hsl(var(--destructive))" : "hsl(175, 70%, 50%)"} />
              <stop offset="100%" stopColor={isLow ? "hsl(0, 60%, 40%)" : "hsl(265, 70%, 60%)"} />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="url(#timer-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        {seconds === 0 && running && (
          <div className="absolute inset-0 rounded-full border-2 border-destructive animate-pulse-ring" />
        )}
        <span className={`font-display text-3xl font-bold tabular-nums ${isLow ? "text-destructive" : "text-foreground"}`}>
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={toggle}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="flex items-center justify-center h-9 w-9 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
