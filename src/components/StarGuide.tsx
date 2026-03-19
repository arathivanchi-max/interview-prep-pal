const steps = [
  { letter: "S", title: "Situation", color: "from-primary to-primary/70" },
  { letter: "T", title: "Task", color: "from-accent to-accent/70" },
  { letter: "A", title: "Action", color: "from-primary to-accent" },
  { letter: "R", title: "Result", color: "from-accent to-primary" },
];

export function StarGuide() {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        STAR Method
      </p>
      <div className="flex gap-2">
        {steps.map((s) => (
          <div
            key={s.letter}
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} font-display text-sm font-bold text-primary-foreground`}
            >
              {s.letter}
            </div>
            <span className="text-xs font-medium text-foreground hidden sm:block">{s.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
