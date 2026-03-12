import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn, UserPlus, Wrench, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back, gearhead!" });
      navigate("/");
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We sent you a confirmation link to verify your account." });
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We sent you a password reset link." });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") handleLogin();
    else if (mode === "signup") handleSignup();
    else handleForgotPassword();
  };

  const titles = { login: "Sign In", signup: "Create Account", forgot: "Reset Password" };
  const subtitles = { login: "Welcome back, gearhead.", signup: "Join the crew.", forgot: "Enter your email to reset." };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="text-center mb-8">
          <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wider">
            {titles[mode]}
          </h1>
          <p className="text-muted-foreground mt-2">{subtitles[mode]}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="font-condensed uppercase tracking-wider text-sm">
                Display Name
              </Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Dom Toretto"
                className="bg-secondary border-border"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-condensed uppercase tracking-wider text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dom@family.com"
              className="bg-secondary border-border"
            />
          </div>
          {mode !== "forgot" && (
            <div className="space-y-2">
              <Label htmlFor="password" className="font-condensed uppercase tracking-wider text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-secondary border-border"
                minLength={6}
              />
            </div>
          )}

          <Button type="submit" className="w-full font-heading uppercase tracking-wider h-12" disabled={loading}>
            {mode === "login" && <LogIn className="w-5 h-5 mr-2" />}
            {mode === "signup" && <UserPlus className="w-5 h-5 mr-2" />}
            {mode === "forgot" && <KeyRound className="w-5 h-5 mr-2" />}
            {loading ? "Please wait..." : titles[mode]}
          </Button>

          <div className="text-center space-y-1">
            {mode === "login" && (
              <>
                <button type="button" onClick={() => setMode("forgot")} className="block w-full text-sm text-muted-foreground hover:text-primary transition-colors">
                  Forgot password?
                </button>
                <button type="button" onClick={() => setMode("signup")} className="block w-full text-sm text-muted-foreground hover:text-primary transition-colors">
                  Don't have an account? Sign up
                </button>
              </>
            )}
            {mode === "signup" && (
              <button type="button" onClick={() => setMode("login")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Already have an account? Sign in
              </button>
            )}
            {mode === "forgot" && (
              <button type="button" onClick={() => setMode("login")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Back to sign in
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
