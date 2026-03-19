import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, ChevronRight, SkipForward } from "lucide-react";
import { Question } from "@/data/questions";
import { Timer } from "./Timer";
import { StarGuide } from "./StarGuide";
import { RatingPanel } from "./RatingPanel";

interface QuestionCardProps {
  question: Question;
  current: number;
  total: number;
  onNext: () => void;
  onRate: (questionId: number, rating: number) => void;
}

export function QuestionCard({ question, current, total, onNext, onRate }: QuestionCardProps) {
  const [showTip, setShowTip] = useState(false);
  const [rated, setRated] = useState(false);

  const handleRate = (rating: number) => {
    setRated(true);
    onRate(question.id, rating);
  };

  const handleNext = () => {
    setShowTip(false);
    setRated(false);
    onNext();
  };

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up" key={question.id}>
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-xs font-medium">
          {question.category}
        </Badge>
        <span className="text-sm text-muted-foreground font-medium">
          {current} / {total}
        </span>
      </div>

      <Card className="border-none shadow-lg bg-card">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl leading-snug text-foreground mb-6">
            {question.question}
          </h2>

          <div className="flex justify-center mb-6">
            <Timer />
          </div>

          {showTip && (
            <div className="rounded-lg bg-secondary/70 p-3 text-sm text-secondary-foreground flex items-start gap-2 animate-fade-in-up">
              <Lightbulb className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <span>{question.tip}</span>
            </div>
          )}

          {!showTip && (
            <button
              onClick={() => setShowTip(true)}
              className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 mx-auto"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              Show tip
            </button>
          )}
        </CardContent>
      </Card>

      <StarGuide />

      <RatingPanel onRate={handleRate} />

      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={handleNext} className="gap-1 text-muted-foreground">
          <SkipForward className="h-3.5 w-3.5" />
          Skip
        </Button>
        <Button onClick={handleNext} disabled={!rated} className="gap-1">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
