ALTER TABLE public.practice_sessions
  ADD CONSTRAINT chk_avg_rating CHECK (avg_rating BETWEEN 0 AND 5),
  ADD CONSTRAINT chk_questions_count CHECK (questions_count BETWEEN 1 AND 200);