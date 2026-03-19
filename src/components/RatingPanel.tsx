import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col items-center gap-2 animate-fade-in-up">
      <p className="text-sm font-medium text-muted-foreground">How did you do?</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <Button
            key={n}
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleClick(n)}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                n <= (hovered || selected)
                  ? "fill-accent text-accent"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        ))}
      </div>
      {selected > 0 && (
        <p className="text-xs text-muted-foreground">
          {selected <= 2 ? "Keep practising — you'll get there!" : selected <= 4 ? "Solid answer!" : "Nailed it! 🔥"}
        </p>
      )}
    </div>
  );
}
