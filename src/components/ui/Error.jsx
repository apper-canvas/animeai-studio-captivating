import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 space-y-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Error icon */}
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-white" />
      </motion.div>
      
      {/* Error message */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white">
          Oops! Something went wrong
        </h3>
        <p className="text-white/70 max-w-md">
          {message}
        </p>
      </div>
      
      {/* Retry button */}
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-anime-pink to-anime-purple rounded-lg font-medium text-white hover:shadow-lg transition-all duration-200 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;