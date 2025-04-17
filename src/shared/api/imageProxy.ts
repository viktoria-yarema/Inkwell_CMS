import axios from "axios";

/**
 * Proxies an image from a remote URL to avoid CORS issues
 * This should be used from a server-side endpoint
 *
 * @param url The URL of the image to proxy
 * @returns The image data as an ArrayBuffer
 */
export const proxyImage = async (
  url: string
): Promise<{ data: ArrayBuffer; contentType: string }> => {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    return {
      data: response.data,
      contentType: response.headers["content-type"] || "image/jpeg",
    };
  } catch (error) {
    console.error("Error proxying image:", error);
    throw new Error(
      `Failed to proxy image: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
