import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// OpenAI service for image transformation
export const transformationService = {
  async transformImage(file, styleId) {
    try {
      // Convert file to base64
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          // Remove the data URL prefix (data:image/...;base64,)
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Create anime style prompt based on styleId
      const stylePrompts = {
        'classic-anime': 'Transform this image into a classic anime style with vibrant colors, cel-shaded artwork, and typical anime character features',
        'modern-anime': 'Convert this into modern anime style with detailed shading, contemporary character design, and polished digital art aesthetics',
        'manga': 'Transform this into black and white manga style with dramatic shading, screen tones, and manga artistic techniques',
        'kawaii': 'Convert this into kawaii anime style with cute, soft features, pastel colors, and adorable character design',
        'cyberpunk-anime': 'Transform this into cyberpunk anime style with neon colors, futuristic elements, and dark sci-fi atmosphere'
      };

const prompt = stylePrompts[styleId] || stylePrompts['classic-anime'];

      // Convert base64 to buffer for OpenAI API
      const imageBuffer = new Uint8Array(atob(base64Image).split('').map(c => c.charCodeAt(0)));
      
      // Create a simple 1x1 transparent PNG as mask
      const maskBuffer = new Uint8Array([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
        0x0B, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
        0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
        0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
      ]);

      // Call OpenAI API for image editing/variation
      const response = await openai.images.edit({
        image: new Blob([imageBuffer], { type: 'image/png' }),
        mask: new Blob([maskBuffer], { type: 'image/png' }),
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url"
      });

      if (!response.data || response.data.length === 0) {
        throw new Error("No transformed image received from OpenAI");
      }

      const transformedImageUrl = response.data[0].url;

      // Convert OpenAI URL to base64 for consistent handling
      const imageResponse = await fetch(transformedImageUrl);
      const imageBlob = await imageResponse.blob();
      const base64TransformedImage = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(imageBlob);
      });

      return {
        id: Date.now().toString(),
        transformedImage: base64TransformedImage,
        style: styleId,
        timestamp: new Date(),
        status: "completed"
      };

    } catch (error) {
      console.error('OpenAI transformation error:', error);
      
      // Handle specific OpenAI errors
      if (error.status === 401) {
        throw new Error("Invalid OpenAI API key. Please check your configuration.");
      } else if (error.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else if (error.status === 400) {
        throw new Error("Invalid image format. Please upload a valid image file.");
      } else {
        throw new Error(error.message || "Failed to transform image. Please try again.");
      }
    }
  }
};