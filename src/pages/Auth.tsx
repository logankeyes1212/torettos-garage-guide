import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn, UserPlus, Wrench } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

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
            {isLogin ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "Welcome back, gearhead." : "Join the crew."}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="font-condensed uppercase tracking-wider text-sm">
                Full Name
              </Label>
              <Input id="name" placeholder="Dom Toretto" className="bg-secondary border-border" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-condensed uppercase tracking-wider text-sm">
              Email
            </Label>
            <Input id="email" type="email" placeholder="dom@family.com" className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-condensed uppercase tracking-wider text-sm">
              Password
            </Label>
            <Input id="password" type="password" placeholder="••••••••" className="bg-secondary border-border" />
          </div>

          <Button className="w-full font-heading uppercase tracking-wider h-12">
            {isLogin ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
