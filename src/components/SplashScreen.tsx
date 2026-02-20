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

            {/* Dense tire smoke — left rear */}
            <div className="absolute bottom-[10%] left-[25%] w-[30%] pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`smoke-l-${i}`}
                  className="absolute rounded-full bg-white/25 blur-2xl"
                  style={{
                    left: `${Math.random() * 60}%`,
                    bottom: 0,
                    width: `${50 + Math.random() * 70}px`,
                    height: `${40 + Math.random() * 60}px`,
                  }}
                  animate={{
                    y: [0, -200 - Math.random() * 100],
                    x: [0, -30 + Math.random() * 60],
                    opacity: [0.7, 0],
                    scale: [1, 2.5 + Math.random()],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 1.5,
                    delay: i * 0.15,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Dense tire smoke — right rear */}
            <div className="absolute bottom-[10%] right-[25%] w-[30%] pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`smoke-r-${i}`}
                  className="absolute rounded-full bg-white/20 blur-2xl"
                  style={{
                    right: `${Math.random() * 60}%`,
                    bottom: 0,
                    width: `${50 + Math.random() * 70}px`,
                    height: `${40 + Math.random() * 60}px`,
                  }}
                  animate={{
                    y: [0, -180 - Math.random() * 120],
                    x: [0, -20 + Math.random() * 40],
                    opacity: [0.6, 0],
                    scale: [1, 2.8 + Math.random()],
                  }}
                  transition={{
                    duration: 1.8 + Math.random() * 1.2,
                    delay: i * 0.18,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Ground-level haze */}
            <motion.div
              className="absolute bottom-[5%] left-[10%] right-[10%] h-16 bg-gradient-to-t from-white/15 to-transparent blur-xl rounded-full pointer-events-none"
              animate={{ opacity: [0.4, 0.7, 0.4], scaleX: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

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
