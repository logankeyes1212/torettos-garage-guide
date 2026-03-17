import { motion } from "framer-motion";

const SpinningWheel = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      >
        {/* Tire */}
        <circle cx="60" cy="60" r="56" fill="none" stroke="hsl(0 0% 20%)" strokeWidth="8" />
        <circle cx="60" cy="60" r="56" fill="none" stroke="hsl(0 0% 12%)" strokeWidth="6" />
        {/* Tire tread marks */}
        {[...Array(24)].map((_, i) => {
          const angle = (i * 15) * (Math.PI / 180);
          const x1 = 60 + Math.cos(angle) * 52;
          const y1 = 60 + Math.sin(angle) * 52;
          const x2 = 60 + Math.cos(angle) * 58;
          const y2 = 60 + Math.sin(angle) * 58;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="hsl(0 0% 25%)"
              strokeWidth="2"
            />
          );
        })}

        {/* Rim outer ring */}
        <circle cx="60" cy="60" r="44" fill="hsl(0 0% 30%)" />
        <circle cx="60" cy="60" r="42" fill="hsl(0 0% 75%)" />
        <circle cx="60" cy="60" r="40" fill="hsl(0 0% 65%)" />

        {/* 5 Spokes */}
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg - 90) * (Math.PI / 180);
          const tipX = 60 + Math.cos(rad) * 38;
          const tipY = 60 + Math.sin(rad) * 38;
          const leftRad = (deg - 90 - 12) * (Math.PI / 180);
          const rightRad = (deg - 90 + 12) * (Math.PI / 180);
          const baseLeft = `${60 + Math.cos(leftRad) * 12},${60 + Math.sin(leftRad) * 12}`;
          const baseRight = `${60 + Math.cos(rightRad) * 12},${60 + Math.sin(rightRad) * 12}`;
          return (
            <polygon
              key={deg}
              points={`${tipX},${tipY} ${baseLeft} ${baseRight}`}
              fill="hsl(0 0% 80%)"
              stroke="hsl(0 0% 55%)"
              strokeWidth="1"
            />
          );
        })}

        {/* Spoke shadows / depth between spokes */}
        {[36, 108, 180, 252, 324].map((deg) => {
          const rad = (deg - 90) * (Math.PI / 180);
          const innerX = 60 + Math.cos(rad) * 14;
          const innerY = 60 + Math.sin(rad) * 14;
          const outerX = 60 + Math.cos(rad) * 36;
          const outerY = 60 + Math.sin(rad) * 36;
          const leftRad = (deg - 90 - 18) * (Math.PI / 180);
          const rightRad = (deg - 90 + 18) * (Math.PI / 180);
          return (
            <polygon
              key={deg}
              points={`
                ${60 + Math.cos(leftRad) * 14},${60 + Math.sin(leftRad) * 14}
                ${60 + Math.cos(leftRad) * 38},${60 + Math.sin(leftRad) * 38}
                ${60 + Math.cos(rightRad) * 38},${60 + Math.sin(rightRad) * 38}
                ${60 + Math.cos(rightRad) * 14},${60 + Math.sin(rightRad) * 14}
              `}
              fill="hsl(0 0% 15%)"
            />
          );
        })}

        {/* Re-draw spokes on top */}
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg - 90) * (Math.PI / 180);
          const tipX = 60 + Math.cos(rad) * 39;
          const tipY = 60 + Math.sin(rad) * 39;
          const leftRad = (deg - 90 - 10) * (Math.PI / 180);
          const rightRad = (deg - 90 + 10) * (Math.PI / 180);
          const baseLeft = `${60 + Math.cos(leftRad) * 13},${60 + Math.sin(leftRad) * 13}`;
          const baseRight = `${60 + Math.cos(rightRad) * 13},${60 + Math.sin(rightRad) * 13}`;
          return (
            <polygon
              key={deg}
              points={`${tipX},${tipY} ${baseLeft} ${baseRight}`}
              fill="url(#spokeGradient)"
              stroke="hsl(0 0% 60%)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Center hub */}
        <circle cx="60" cy="60" r="12" fill="hsl(0 0% 70%)" stroke="hsl(0 0% 50%)" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="8" fill="hsl(0 0% 80%)" />
        <circle cx="60" cy="60" r="4" fill="hsl(0 0% 60%)" />

        {/* Lug nuts */}
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg - 90) * (Math.PI / 180);
          return (
            <circle
              key={deg}
              cx={60 + Math.cos(rad) * 8}
              cy={60 + Math.sin(rad) * 8}
              r="1.8"
              fill="hsl(0 0% 55%)"
              stroke="hsl(0 0% 40%)"
              strokeWidth="0.5"
            />
          );
        })}

        <defs>
          <linearGradient id="spokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0 0% 85%)" />
            <stop offset="100%" stopColor="hsl(0 0% 65%)" />
          </linearGradient>
        </defs>
      </motion.svg>

      <p className="font-condensed text-muted-foreground uppercase tracking-wider">
        Consulting Dominic Toretto...
      </p>
    </div>
  );
};

export default SpinningWheel;
