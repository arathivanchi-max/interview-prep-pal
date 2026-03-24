import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Trophy, Crown, Medal, Award, ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface LeaderboardEntry {
  user_id: string;
  best_score: number;
  total_sessions: number;
  total_questions: number;
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase.rpc("get_leaderboard");

      if (error || !data) {
        setLoading(false);
        return;
      }

      setEntries(data as LeaderboardEntry[]);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="h-5 w-5 text-primary" />;
    if (rank === 1) return <Medal className="h-5 w-5 text-secondary-foreground" />;
    if (rank === 2) return <Award className="h-5 w-5 text-accent" />;
    return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank + 1}</span>;
  };

  const getAnonymousName = (userId: string) => {
    const hash = userId.slice(0, 8).toUpperCase();
    return `Player ${hash.slice(0, 4)}`;
  };

  const getInitials = (userId: string) => {
    return userId.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/"
            className="flex items-center justify-center h-9 w-9 rounded-xl glass text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-extrabold text-foreground">Leaderboard</h1>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : entries.length === 0 ? (
          <div className="glass-strong rounded-2xl p-8 text-center">
            <Trophy className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No scores yet. Be the first to practice!</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full text-sm font-semibold text-primary-foreground glow-primary"
              style={{ background: "var(--gradient-primary)" }}
            >
              Start Practicing
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry, i) => {
              const isMe = user?.id === entry.user_id;
              return (
                <div
                  key={entry.user_id}
                  className={`flex items-center gap-3 rounded-xl p-4 transition-all ${
                    isMe
                      ? "glass-strong border border-primary/30 shadow-[0_0_20px_-5px_hsl(175,70%,50%,0.2)]"
                      : "glass"
                  }`}
                >
                  <div className="shrink-0 w-8 flex justify-center">
                    {getRankIcon(i)}
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground shrink-0">
                    {getInitials(entry.user_id)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {getAnonymousName(entry.user_id)}
                      {isMe && <span className="text-primary ml-1.5 text-xs">(you)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.total_sessions} session{entry.total_sessions !== 1 ? "s" : ""} · {entry.total_questions} questions
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold gradient-text">{entry.best_score.toFixed(1)}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">best</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
