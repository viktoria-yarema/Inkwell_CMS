import api from "./apiMiddleware";

/**
 * Fetches an image from an external URL through our server to avoid CORS issues
 * The backend must have a corresponding endpoint to proxy this request
 *
 * @param imageUrl The URL of the image to fetch
 * @returns A blob representing the image
 */
export const fetchProxyImage = async (imageUrl: string): Promise<Blob> => {
  try {
    const response = await api.get("/images/proxy", {
      params: { url: imageUrl },
      responseType: "blob",
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching image through proxy:", error);
    throw new Error(
      `Failed to fetch image: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
