import { useState, useMemo } from "react";
import { questions, categories, difficulties, Difficulty } from "@/data/questions";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsSummary } from "@/components/ResultsSummary";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Mic, Sparkles, Zap, Flame, Brain, Shield, Users, Lightbulb, MessageSquare, Target, Heart, Swords, Rocket, ChevronRight } from "lucide-react";

type Phase = "home" | "practice" | "results";

const difficultyConfig: Record<Difficulty, { icon: typeof Zap; gradient: string; shadow: string; text: string }> = {
  Easy: { icon: Zap, gradient: "from-emerald-500 to-teal-400", shadow: "shadow-[0_0_20px_-4px_hsl(152,60%,45%)]", text: "text-emerald-300" },
  Medium: { icon: Flame, gradient: "from-amber-500 to-orange-400", shadow: "shadow-[0_0_20px_-4px_hsl(36,90%,55%)]", text: "text-amber-300" },
  Hard: { icon: Brain, gradient: "from-rose-500 to-pink-400", shadow: "shadow-[0_0_20px_-4px_hsl(350,70%,55%)]", text: "text-rose-300" },
};

const categoryIcons: Record<string, typeof Shield> = {
  Leadership: Shield, "Problem-Solving": Lightbulb, Collaboration: Users,
  Adaptability: Rocket, Communication: MessageSquare, Delivery: Target,
  "Customer Focus": Heart, "Conflict Resolution": Swords, Innovation: Sparkles,
  "Strategic Thinking": Brain,
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

          {/* Difficulty filter carousel */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
              Difficulty
            </p>
            <Carousel
              opts={{ align: "center", loop: true }}
              className="w-full max-w-[220px] mx-auto"
            >
              <CarouselContent className="-ml-0">
                {difficulties.map((diff) => {
                  const isActive = selectedDifficulties.includes(diff);
                  const config = difficultyConfig[diff];
                  const Icon = config.icon;
                  return (
                    <CarouselItem key={diff} className="pl-0 basis-full">
                      <button
                        onClick={() => toggleDifficulty(diff)}
                        className={`group relative w-full flex flex-col items-center gap-3 px-6 py-6 rounded-2xl text-base font-bold transition-all duration-500 ease-out ${
                          isActive
                            ? `bg-gradient-to-b ${config.gradient} text-white ${config.shadow} scale-105`
                            : "glass text-muted-foreground hover:text-foreground hover:scale-[1.02]"
                        }`}
                      >
                        <div className={`relative transition-transform duration-500 ${isActive ? "scale-150 rotate-12" : "group-hover:scale-125 group-hover:-rotate-6"}`}>
                          <Icon className="h-8 w-8" />
                          {isActive && (
                            <div className="absolute inset-0 animate-pulse-ring rounded-full" style={{ boxShadow: `0 0 16px 6px currentColor` }} />
                          )}
                        </div>
                        <span className="tracking-widest text-lg">{diff}</span>
                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/60 animate-scale-up" />
                        )}
                      </button>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="glass border-border/50 text-muted-foreground hover:text-foreground -left-10" />
              <CarouselNext className="glass border-border/50 text-muted-foreground hover:text-foreground -right-10" />
            </Carousel>
          </div>

          {/* Category icon grid */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
              Category
            </p>
            <div className="grid grid-cols-5 gap-2 max-w-[280px] mx-auto">
              {categories.map((cat) => {
                const isActive = selectedCategories.includes(cat);
                const Icon = categoryIcons[cat] || Sparkles;
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    title={cat}
                    className={`group relative flex flex-col items-center justify-center w-full aspect-square rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_-3px_hsl(175,70%,50%,0.3)] scale-105"
                        : "glass text-muted-foreground hover:text-foreground hover:scale-105"
                    }`}
                  >
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className={`text-[9px] font-medium mt-1 leading-tight text-center transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                      {cat.length > 10 ? cat.split(/[\s-]/)[0] : cat}
                    </span>
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
