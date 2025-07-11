import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import UploadZone from "@/components/molecules/UploadZone";
import ImagePreview from "@/components/molecules/ImagePreview";
import StyleSelector from "@/components/molecules/StyleSelector";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useImageTransformation } from "@/hooks/useImageTransformation";
import { STYLE_PRESETS } from "@/services/mockData/stylePresets";

const TransformationWorkspace = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(STYLE_PRESETS[0].id);
  
  const {
    transformImage,
    transformedImage,
    isProcessing,
    error,
    reset
  } = useImageTransformation();

  const handleFileUpload = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImageUrl(e.target.result);
      setSelectedFile(file);
      toast.success("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleTransform = useCallback(async () => {
    if (!selectedFile || !selectedStyle) {
      toast.error("Please select an image and style first");
      return;
    }

    try {
      await transformImage(selectedFile, selectedStyle);
      toast.success("Image transformed successfully!");
    } catch (error) {
      toast.error("Failed to transform image. Please try again.");
    }
  }, [selectedFile, selectedStyle, transformImage]);

  const handleDownload = useCallback((imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `anime-transformed-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully!");
  }, []);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setOriginalImageUrl(null);
    reset();
    toast.info("Workspace cleared");
  }, [reset]);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Upload and Controls */}
        <div className="space-y-6">
          {/* Upload Zone */}
          <UploadZone
            onFileUpload={handleFileUpload}
            disabled={isProcessing}
          />

          {/* Style Selector */}
          {originalImageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StyleSelector
                styles={STYLE_PRESETS}
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
              />
            </motion.div>
          )}

          {/* Transform Button */}
          {originalImageUrl && !transformedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handleTransform}
                loading={isProcessing}
                disabled={isProcessing}
                className="w-full transform-button"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <ApperIcon name="Zap" className="w-5 h-5 mr-2 animate-pulse" />
                    Transforming Magic...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Sparkles" className="w-5 h-5 mr-2" />
                    Transform to Anime
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <ApperIcon name="AlertCircle" className="w-5 h-5 text-red-400" />
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Preview */}
        <div>
          <ImagePreview
            originalImage={originalImageUrl}
            transformedImage={transformedImage}
            isProcessing={isProcessing}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TransformationWorkspace;