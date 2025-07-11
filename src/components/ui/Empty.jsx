import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No images yet", 
  description = "Upload your first image to get started with anime transformation!",
  actionLabel = "Upload Image",
  onAction
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 space-y-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Empty state illustration */}
      <motion.div
        className="relative"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-24 h-24 bg-gradient-to-br from-anime-purple to-anime-cyan rounded-2xl flex items-center justify-center relative overflow-hidden">
          <ApperIcon name="Image" className="w-12 h-12 text-white" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20" />
        </div>
        
        {/* Floating sparkles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-anime-pink rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              right: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>
      
      {/* Empty state content */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white font-display">
          {title}
        </h3>
        <p className="text-white/70 max-w-md text-lg">
          {description}
        </p>
      </div>
      
      {/* Action button */}
      {onAction && (
        <motion.button
          onClick={onAction}
          className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-anime-pink to-anime-purple rounded-xl font-bold text-white text-lg neon-glow hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Upload" className="w-5 h-5" />
          <span>{actionLabel}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;