import { motion } from "framer-motion";

const Loading = ({ message = "Processing your image..." }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main loading skeleton */}
      <div className="w-full max-w-md aspect-square bg-anime-surface rounded-xl skeleton-shimmer" />
      
      {/* Loading indicator */}
      <div className="flex items-center space-x-3">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-anime-pink to-anime-purple rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        <span className="text-white/80 font-medium">{message}</span>
      </div>
      
      {/* Progress bar skeleton */}
      <div className="w-full max-w-md bg-anime-surface rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-anime-pink via-anime-purple to-anime-cyan"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default Loading;