import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { letter: "S", title: "Situation", desc: "Set the scene and context" },
  { letter: "T", title: "Task", desc: "Your responsibility or challenge" },
  { letter: "A", title: "Action", desc: "What you specifically did" },
  { letter: "R", title: "Result", desc: "The outcome — quantify it" },
];

export function StarGuide() {
  return (
    <Card className="border-accent/30 bg-secondary/50">
      <CardContent className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          STAR Method
        </p>
        <div className="grid grid-cols-4 gap-2">
          {steps.map((s) => (
            <div key={s.letter} className="text-center">
              <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-lg text-accent-foreground">
                {s.letter}
              </div>
              <p className="text-xs font-semibold text-foreground">{s.title}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
