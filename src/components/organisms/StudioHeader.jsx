import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const StudioHeader = () => {
  return (
    <motion.header
      className="bg-anime-surface border-b border-white/10 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-anime-pink to-anime-purple rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon name="Sparkles" className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white font-display">
                AnimeAI Studio
              </h1>
              <p className="text-xs text-white/60">
                Transform photos into anime art
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-anime-pink to-anime-purple bg-clip-text">
                10K+
              </div>
              <div className="text-xs text-white/60">Images transformed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-anime-purple to-anime-cyan bg-clip-text">
                5+
              </div>
              <div className="text-xs text-white/60">Art styles</div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default StudioHeader;