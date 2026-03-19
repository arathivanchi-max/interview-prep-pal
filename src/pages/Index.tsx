import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { questions, categories } from "@/data/questions";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsSummary } from "@/components/ResultsSummary";
import { Mic, Shuffle } from "lucide-react";

type Phase = "home" | "practice" | "results";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("home");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});

  const activeQuestions = useMemo(() => {
    const filtered = selectedCategories.length > 0
      ? questions.filter((q) => selectedCategories.includes(q.category))
      : questions;
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [selectedCategories, phase]); // re-shuffle on restart

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const startPractice = () => {
    setCurrentIdx(0);
    setRatings({});
    setPhase("practice");
  };

  const handleNext = () => {
    if (currentIdx >= activeQuestions.length - 1) {
      setPhase("results");
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const handleRate = (questionId: number, rating: number) => {
    setRatings((prev) => ({ ...prev, [questionId]: rating }));
  };

  const handleRestart = () => {
    setPhase("home");
    setSelectedCategories([]);
  };

  if (phase === "home") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center animate-fade-in-up">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <Mic className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl text-foreground mb-2">Interview Coach</h1>
          <p className="text-muted-foreground mb-8">
            Practice behavioral questions with a timer, STAR framework, and self-assessment.
          </p>

          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              Filter by category
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategories.includes(cat) ? "default" : "outline"}
                  className="cursor-pointer select-none transition-all hover:scale-105"
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {questions.filter((q) => selectedCategories.includes(q.category)).length} questions selected
              </p>
            )}
          </div>

          <Button onClick={startPractice} size="lg" className="gap-2 text-base px-8">
            <Shuffle className="h-4 w-4" />
            Start Practice
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="min-h-screen flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-lg">
          <ResultsSummary ratings={ratings} onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  const question = activeQuestions[currentIdx];
  const progress = ((currentIdx + 1) / activeQuestions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="mb-6">
          <Progress value={progress} className="h-1.5" />
        </div>
        <QuestionCard
          question={question}
          current={currentIdx + 1}
          total={activeQuestions.length}
          onNext={handleNext}
          onRate={handleRate}
        />
      </div>
    </div>
  );
};

export default Index;
