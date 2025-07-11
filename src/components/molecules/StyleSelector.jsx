import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";

const StyleSelector = ({ styles, selectedStyle, onStyleChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Choose Style</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {styles.map((style) => (
          <motion.div
            key={style.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={cn(
                "p-4 cursor-pointer transition-all duration-300 style-card",
                selectedStyle === style.id ? "selected" : ""
              )}
              onClick={() => onStyleChange(style.id)}
            >
              <div className="aspect-square bg-gradient-to-br from-anime-purple/20 to-anime-cyan/20 rounded-lg mb-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-anime-pink to-anime-purple rounded-full" />
              </div>
              <h4 className="font-medium text-white mb-1">{style.name}</h4>
              <p className="text-sm text-white/70">{style.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;