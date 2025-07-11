import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const UploadZone = ({ onFileUpload, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(file => 
      file.type.startsWith("image/") && 
      ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    );

    if (validFile) {
      onFileUpload(validFile);
    } else {
      toast.error("Please upload a valid image file (JPG, PNG, or WebP)");
    }
  }, [onFileUpload, disabled]);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <Card
      className={cn(
        "p-8 border-2 border-dashed border-white/20 text-center transition-all duration-300 upload-zone",
        isDragOver && "drag-over",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <motion.div
        className="space-y-6"
        animate={{ 
          scale: isDragOver ? 1.05 : 1,
          opacity: disabled ? 0.5 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Upload icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-anime-pink to-anime-purple rounded-full flex items-center justify-center">
            <ApperIcon name="Upload" className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Upload text */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white font-display">
            Drop your image here
          </h3>
          <p className="text-white/70">
            or click to browse your files
          </p>
          <p className="text-sm text-white/50">
            Supports JPG, PNG, and WebP formats
          </p>
        </div>

        {/* File input */}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-anime-purple to-anime-cyan rounded-lg font-medium text-white cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <ApperIcon name="FolderOpen" className="w-4 h-4" />
          <span>Browse Files</span>
        </label>
      </motion.div>
    </Card>
  );
};

export default UploadZone;