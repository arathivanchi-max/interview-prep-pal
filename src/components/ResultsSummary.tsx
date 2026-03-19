import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Star, Trophy } from "lucide-react";
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

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <Trophy className="h-8 w-8 text-accent" />
        </div>
        <h2 className="text-2xl md:text-3xl text-foreground mb-2">Session Complete</h2>
        <p className="text-muted-foreground">{getMessage()}</p>
        <div className="mt-3 flex items-center justify-center gap-1">
          <span className="font-display text-3xl text-foreground">{avg.toFixed(1)}</span>
          <Star className="h-5 w-5 fill-accent text-accent" />
          <span className="text-sm text-muted-foreground">average</span>
        </div>
      </div>

      <div className="space-y-2">
        {entries.map(({ question, rating }) => (
          <Card key={question.id} className="border-none shadow-sm">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <Badge variant="secondary" className="text-[10px] mb-1">
                  {question.category}
                </Badge>
                <p className="text-sm text-foreground truncate">{question.question}</p>
              </div>
              <div className="flex gap-0.5 shrink-0">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`h-3.5 w-3.5 ${
                      n <= rating ? "fill-accent text-accent" : "text-muted"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={onRestart} className="gap-2 mx-auto">
        <RotateCcw className="h-4 w-4" />
        Practice Again
      </Button>
    </div>
  );
}
