import { Badge } from "@/components/ui/badge";
import { RotateCcw, Star, Trophy, Sparkles } from "lucide-react";
import { questions } from "@/data/questions";

interface ResultsSummaryProps {
  ratings: Record<number, number>;
  onRestart: () => void;
}

export function ResultsSummary({ ratings, onRestart }: ResultsSummaryProps) {
  const entries = Object.entries(ratings).map(([id, rating]) => ({
    question: questions.find((q) => q.id === Number(id))!,
    rating,
  }));

  const avg = entries.length > 0
    ? entries.reduce((sum, e) => sum + e.rating, 0) / entries.length
    : 0;

  const getMessage = () => {
    if (avg >= 4.5) return "Outstanding! You're interview-ready. 🎉";
    if (avg >= 3.5) return "Great performance! A few more reps and you'll nail it.";
    if (avg >= 2.5) return "Good foundation. Focus on the areas below.";
    return "Keep practising — every rep makes you stronger. 💪";
  };

  const getColor = (rating: number) => {
    if (rating >= 4) return "bg-success";
    if (rating >= 3) return "bg-primary";
    if (rating >= 2) return "bg-accent";
    return "bg-destructive";
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {/* Celebration header */}
      <div className="text-center">
        <div className="mx-auto mb-4 relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full mx-auto glow-primary" style={{ background: "var(--gradient-primary)" }}>
            <Trophy className="h-10 w-10 text-primary-foreground" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-primary animate-glow-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">Session Complete</h2>
        <p className="text-muted-foreground">{getMessage()}</p>

        {/* Score circle */}
        <div className="mt-4 mx-auto flex items-center justify-center gap-2">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <svg className="-rotate-90" viewBox="0 0 100 100" width="64" height="64">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" />
              <defs>
                <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(175, 70%, 50%)" />
                  <stop offset="100%" stopColor="hsl(265, 70%, 60%)" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#score-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - avg / 5)}
              />
            </svg>
            <span className="absolute font-display text-lg font-bold text-foreground">{avg.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">/ 5.0</span>
        </div>
      </div>

      {/* Question list */}
      <div className="space-y-2">
        {entries.map(({ question, rating }) => (
          <div key={question.id} className="glass rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {question.category}
                </span>
                <span className={`text-[10px] font-bold ${
                  question.difficulty === "Easy" ? "text-emerald-400" :
                  question.difficulty === "Medium" ? "text-amber-400" : "text-rose-400"
                }`}>
                  · {question.difficulty}
                </span>
              </div>
              <p className="text-sm text-foreground truncate">{question.question}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    n <= rating ? getColor(rating) : "bg-secondary"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Restart button */}
      <button
        onClick={onRestart}
        className="group mx-auto flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 glow-primary"
        style={{ background: "var(--gradient-primary)" }}
      >
        <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-180 duration-500" />
        Practice Again
      </button>
    </div>
  );
}
