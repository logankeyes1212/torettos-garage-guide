import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KeyRound, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is a recovery flow
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated!", description: "You can now sign in with your new password." });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <motion.div className="w-full max-w-md" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-8">
          <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wider">New Password</h1>
          <p className="text-muted-foreground mt-2">Choose a strong new password.</p>
        </div>
        <form onSubmit={handleReset} className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="font-condensed uppercase tracking-wider text-sm">New Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-secondary border-border" minLength={6} />
          </div>
          <Button type="submit" className="w-full font-heading uppercase tracking-wider h-12" disabled={loading}>
            <KeyRound className="w-5 h-5 mr-2" />
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
