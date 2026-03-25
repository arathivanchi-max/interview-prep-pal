
-- Drop and recreate get_leaderboard with hashed user_id
DROP FUNCTION IF EXISTS public.get_leaderboard();

CREATE FUNCTION public.get_leaderboard()
 RETURNS TABLE(player_hash text, best_score numeric, total_sessions bigint, total_questions bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT
    encode(sha256(ps.user_id::text::bytea), 'hex') AS player_hash,
    MAX(ps.avg_rating) AS best_score,
    COUNT(*) AS total_sessions,
    SUM(ps.questions_count)::bigint AS total_questions
  FROM public.practice_sessions ps
  GROUP BY ps.user_id
  ORDER BY best_score DESC, total_sessions DESC;
$$;

-- Restrict to authenticated users only
REVOKE EXECUTE ON FUNCTION public.get_leaderboard() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard() TO authenticated;

-- Tighten profiles SELECT policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
