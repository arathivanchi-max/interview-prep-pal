import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Mic, Mail, Lock, Loader2 } from "lucide-react";

export default function Auth() {
  const { user, loading, signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      setError(error.message);
    } else if (isSignUp) {
      setConfirmSent(true);
    }
    setSubmitting(false);
  };

  if (confirmSent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="glass-strong rounded-2xl p-8 w-full max-w-sm text-center">
          <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Check your email</h2>
          <p className="text-muted-foreground text-sm">
            We sent a confirmation link to <strong className="text-foreground">{email}</strong>. Click it to activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl glass gradient-border glow-primary">
            <Mic className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isSignUp ? "Sign up to track your scores on the leaderboard" : "Sign in to continue practicing"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-primary-foreground transition-all hover:scale-[1.02] glow-primary disabled:opacity-50"
            style={{ background: "var(--gradient-primary)" }}
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
            className="text-primary hover:underline font-medium"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
