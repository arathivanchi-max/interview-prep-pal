import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const DURATION = 120; // 2 minutes

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

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={isLow ? "hsl(var(--destructive))" : "hsl(var(--accent))"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - pct / 100)}`}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        {seconds === 0 && running && (
          <div className="absolute inset-0 rounded-full border-2 border-destructive animate-pulse-ring" />
        )}
        <span className={`font-display text-3xl tabular-nums ${isLow ? "text-destructive" : "text-foreground"}`}>
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={toggle} className="gap-1.5">
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? "Pause" : "Start"}
        </Button>
        <Button size="sm" variant="ghost" onClick={reset}>
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
