
-- Drop the overly permissive SELECT policy
DROP POLICY "Anyone can view practice sessions" ON public.practice_sessions;

-- Users can only read their own sessions
CREATE POLICY "Users can view own sessions"
  ON public.practice_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create a security definer function for leaderboard aggregation
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE (
  user_id uuid,
  best_score numeric,
  total_sessions bigint,
  total_questions bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    ps.user_id,
    MAX(ps.avg_rating) AS best_score,
    COUNT(*) AS total_sessions,
    SUM(ps.questions_count)::bigint AS total_questions
  FROM public.practice_sessions ps
  GROUP BY ps.user_id
  ORDER BY best_score DESC, total_sessions DESC;
$$;
