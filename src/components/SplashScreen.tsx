import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chargerBurnout from "@/assets/charger-splash.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-background to-background" />

          {/* Speed lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[2px] bg-gradient-to-r from-transparent via-ember-glow/60 to-transparent"
                style={{
                  top: `${20 + i * 8}%`,
                  width: "40%",
                  left: "30%",
                }}
                animate={{
                  x: ["-100%", "200%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            ))}
          </div>

          {/* Smoke effects */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-10 rounded-full bg-muted/40 blur-xl"
                style={{
                  left: `${35 + Math.random() * 30}%`,
                  width: `${60 + Math.random() * 80}px`,
                  height: `${60 + Math.random() * 80}px`,
                }}
                animate={{
                  y: [0, -250],
                  opacity: [0.6, 0],
                  scale: [1, 3],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          {/* Charger burnout image — shaking */}
          <motion.div
            className="relative z-10 w-full max-w-2xl px-4"
            animate={{ x: [-3, 4, -4, 3, -2, 0] }}
            transition={{ duration: 0.12, repeat: Infinity }}
          >
            <motion.img
              src={chargerBurnout}
              alt="1970 Dodge Charger burnout"
              className="w-full h-auto drop-shadow-[0_0_60px_hsl(12,90%,50%,0.6)] select-none"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Extra animated smoke at tire base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-6 rounded-full bg-white/20 blur-2xl"
                  style={{
                    left: `${40 + i * 4}%`,
                    width: `${80 + i * 20}px`,
                    height: `${60 + i * 15}px`,
                  }}
                  animate={{ y: [0, -180], opacity: [0.7, 0], scale: [1, 2.5] }}
                  transition={{ duration: 1.5 + i * 0.2, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>

            {/* Tire marks */}
            <motion.div
              className="flex justify-center gap-12 mt-1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
            >
              <div className="w-24 h-1.5 bg-gradient-to-l from-muted-foreground/60 to-transparent rounded-full" />
              <div className="w-24 h-1.5 bg-gradient-to-l from-muted-foreground/60 to-transparent rounded-full" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-wider uppercase">
              <span className="text-foreground">Toretto's</span>{" "}
              <span className="text-primary">Toolbox</span>
            </h1>
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
