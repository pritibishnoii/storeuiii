import { BASE_URL } from "../redux/constant";

// Handle both relative and absolute image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // If it's a relative path, prepend the base URL
  return `${BASE_URL}${imagePath}`;
};
