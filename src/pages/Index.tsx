import { useState, useMemo } from "react";
import { questions, categories, difficulties, Difficulty } from "@/data/questions";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsSummary } from "@/components/ResultsSummary";
import { Mic, Sparkles, Zap, Flame, Brain } from "lucide-react";

type Phase = "home" | "practice" | "results";

const difficultyConfig: Record<Difficulty, { icon: typeof Zap; color: string; activeColor: string }> = {
  Easy: { icon: Zap, color: "text-success", activeColor: "text-success glow-primary" },
  Medium: { icon: Flame, color: "text-primary", activeColor: "text-primary glow-primary" },
  Hard: { icon: Brain, color: "text-accent", activeColor: "text-accent glow-accent" },
};

const Index = () => {
  const [phase, setPhase] = useState<Phase>("home");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});

  const activeQuestions = useMemo(() => {
    let filtered = questions;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((q) => selectedCategories.includes(q.category));
    }
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((q) => selectedDifficulties.includes(q.difficulty));
    }
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [selectedCategories, selectedDifficulties, phase]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleDifficulty = (diff: Difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  const filteredCount = useMemo(() => {
    let filtered = questions;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((q) => selectedCategories.includes(q.category));
    }
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((q) => selectedDifficulties.includes(q.difficulty));
    }
    return filtered.length;
  }, [selectedCategories, selectedDifficulties]);

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
    setSelectedDifficulties([]);
  };

  const hasFilters = selectedCategories.length > 0 || selectedDifficulties.length > 0;

  if (phase === "home") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="w-full max-w-md text-center animate-fade-in-up relative z-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl glass gradient-border glow-primary">
            <Mic className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            <span className="gradient-text">Interview</span>
            <br />
            <span className="text-foreground">Coach</span>
          </h1>
          <p className="text-muted-foreground text-base mb-10 max-w-xs mx-auto leading-relaxed">
            Practice behavioral questions with a timer, STAR framework, and self-assessment.
          </p>

          {/* Difficulty filter */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">
              Difficulty
            </p>
            <div className="flex justify-center gap-2">
              {difficulties.map((diff) => {
                const isActive = selectedDifficulties.includes(diff);
                const config = difficultyConfig[diff];
                const Icon = config.icon;
                return (
                  <button
                    key={diff}
                    onClick={() => toggleDifficulty(diff)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? `glass gradient-border ${config.color}`
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category chips */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">
              Category
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "glass gradient-border text-primary glow-primary"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            {hasFilters && (
              <p className="text-xs text-muted-foreground mt-3">
                {filteredCount} question{filteredCount !== 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          <button
            onClick={startPractice}
            disabled={filteredCount === 0}
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-105 glow-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Start Practice
          </button>
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
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: "var(--gradient-primary)",
              }}
            />
          </div>
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
