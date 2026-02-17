import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, LogIn, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { to: "/auth", label: "Sign In", icon: LogIn },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <Wrench className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform" />
          <span className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wider">
            <span className="text-foreground">Toretto's</span>{" "}
            <span className="text-primary">Toolbox</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="relative px-4 py-2 flex items-center gap-2 text-sm font-condensed font-semibold uppercase tracking-wider transition-colors hover:text-primary"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
