import { useState } from "react";
import { Star } from "lucide-react";

interface RatingPanelProps {
  onRate: (rating: number) => void;
}

export function RatingPanel({ onRate }: RatingPanelProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleClick = (val: number) => {
    setSelected(val);
    onRate(val);
  };

  return (
    <div className="flex flex-col items-center gap-3 animate-fade-in-up">
      <p className="text-sm font-medium text-muted-foreground">How did you do?</p>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = n <= (hovered || selected);
          return (
            <button
              key={n}
              className="h-11 w-11 flex items-center justify-center rounded-xl glass transition-all duration-200 hover:scale-110"
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => handleClick(n)}
            >
              <Star
                className={`h-6 w-6 transition-all duration-200 ${
                  active
                    ? "fill-primary text-primary drop-shadow-[0_0_6px_hsl(175,70%,50%)]"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          );
        })}
      </div>
      {selected > 0 && (
        <p className="text-xs text-muted-foreground">
          {selected <= 2 ? "Keep practising — you'll get there!" : selected <= 4 ? "Solid answer!" : "Nailed it! 🔥"}
        </p>
      )}
    </div>
  );
}
