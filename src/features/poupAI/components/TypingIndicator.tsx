import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.15,
            ease: [0.42, 0, 0.58, 1], //easeInOut
          }}
          className="w-2 h-2 rounded-full bg-slate-400"
        />
      ))}
    </div>
  );
}
