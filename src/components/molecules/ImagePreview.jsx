import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const ImagePreview = ({ 
  originalImage, 
  transformedImage, 
  isProcessing = false,
  onDownload,
  onReset 
}) => {
  const handleDownload = () => {
    if (transformedImage && onDownload) {
      onDownload(transformedImage);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Preview</h3>
        {originalImage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-white/70 hover:text-white"
          >
            <ApperIcon name="X" className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Original Image */}
        {originalImage && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Original</h4>
            <div className="aspect-square bg-anime-surface rounded-lg overflow-hidden">
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Transformed Image */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-white/80">Anime Style</h4>
          <div className="aspect-square bg-anime-surface rounded-lg overflow-hidden flex items-center justify-center">
            {isProcessing ? (
              <motion.div
                className="flex flex-col items-center space-y-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-12 h-12 border-4 border-anime-pink border-t-transparent rounded-full animate-spin" />
                <span className="text-white/70 text-sm">Transforming...</span>
              </motion.div>
            ) : transformedImage ? (
              <motion.img
                src={transformedImage}
                alt="Transformed"
                className="w-full h-full object-cover image-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <div className="text-center space-y-2">
                <ApperIcon name="Image" className="w-12 h-12 text-white/40 mx-auto" />
                <p className="text-white/40 text-sm">Preview will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Download Button */}
        {transformedImage && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleDownload}
              className="w-full neon-glow"
              size="lg"
            >
              <ApperIcon name="Download" className="w-5 h-5 mr-2" />
              Download Anime Image
            </Button>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default ImagePreview;