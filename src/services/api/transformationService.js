// Mock service for image transformation
export const transformationService = {
  async transformImage(file, styleId) {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // In a real app, this would send the image to an AI service
    // For now, we'll return a mock transformed image
    return new Promise((resolve, reject) => {
      // Simulate occasional failures
      if (Math.random() < 0.1) {
        reject(new Error("Transformation failed. Please try again."));
        return;
      }

      // Create a mock transformed image (in reality, this would come from the AI service)
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the original image
        ctx.drawImage(img, 0, 0);
        
        // Apply a simple filter to simulate anime transformation
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Apply anime-style color adjustments
        for (let i = 0; i < data.length; i += 4) {
          // Increase saturation and contrast
          data[i] = Math.min(255, data[i] * 1.2);     // Red
          data[i + 1] = Math.min(255, data[i + 1] * 1.2); // Green  
          data[i + 2] = Math.min(255, data[i + 2] * 1.2); // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Add a subtle anime-style overlay
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "rgba(233, 30, 99, 0.05)");
        gradient.addColorStop(1, "rgba(124, 77, 255, 0.05)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const transformedImageUrl = canvas.toDataURL("image/png");
        
        resolve({
          id: Date.now().toString(),
          transformedImage: transformedImageUrl,
          style: styleId,
          timestamp: new Date(),
          status: "completed"
        });
      };
      
      img.onerror = () => {
        reject(new Error("Failed to process image"));
      };
      
      // Convert file to data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
};