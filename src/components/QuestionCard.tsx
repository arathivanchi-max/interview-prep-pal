import { useState } from "react";
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full glass text-xs font-medium text-primary">
          {question.category}
        </span>
        <span className="text-sm text-muted-foreground font-medium tabular-nums">
          {current} / {total}
        </span>
      </div>

      {/* Main card */}
      <div className="glass-strong rounded-2xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold leading-snug text-foreground mb-6">
          {question.question}
        </h2>

        <div className="flex justify-center mb-6">
          <Timer />
        </div>

        {showTip && (
          <div className="rounded-xl glass p-3 text-sm text-secondary-foreground flex items-start gap-2 animate-fade-in-up">
            <Lightbulb className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <span>{question.tip}</span>
          </div>
        )}

        {!showTip && (
          <button
            onClick={() => setShowTip(true)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 mx-auto"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            Show tip
          </button>
        )}
      </div>

      <StarGuide />
      <RatingPanel onRate={handleRate} />

      {/* Navigation */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <SkipForward className="h-3.5 w-3.5" />
          Skip
        </button>
        <button
          onClick={handleNext}
          disabled={!rated}
          className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-primary-foreground transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
          style={{ background: rated ? "var(--gradient-primary)" : "hsl(var(--muted))" }}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
