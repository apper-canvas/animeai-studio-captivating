import { useState, useCallback } from "react";
import { transformationService } from "@/services/api/transformationService";

export const useImageTransformation = () => {
  const [transformedImage, setTransformedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const transformImage = useCallback(async (file, styleId) => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await transformationService.transformImage(file, styleId);
      setTransformedImage(result.transformedImage);
      return result;
    } catch (err) {
      setError(err.message || "Failed to transform image");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setTransformedImage(null);
    setError(null);
    setIsProcessing(false);
  }, []);

  return {
    transformImage,
    transformedImage,
    isProcessing,
    error,
    reset
  };
};