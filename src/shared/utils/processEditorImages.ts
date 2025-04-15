import { uploadImage } from "@/entities/articles/api/uploadImage";

interface ProcessImagesResult {
  updatedContent: string;
  uploadPromises: Promise<void>[];
}

/**
 * Extracts base64 images from Quill editor content and uploads them to storage
 */
export const processEditorImages = async (
  content: string,
  userId: string
): Promise<ProcessImagesResult> => {
  // Parse the Delta content
  let delta;
  try {
    delta = JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse editor content:", error);
    throw new Error("Invalid editor content format");
  }

  const uploadPromises: Promise<void>[] = [];

  // Process each operation in the delta
  if (delta.ops && Array.isArray(delta.ops)) {
    // Create a map to track image replacements
    const imageReplacements = new Map<string, string>();

    // First pass: collect all base64 images and start uploading them
    for (let i = 0; i < delta.ops.length; i++) {
      const op = delta.ops[i];

      if (
        op.insert?.image &&
        typeof op.insert.image === "string" &&
        op.insert.image.startsWith("data:")
      ) {
        // Convert base64 to blob
        const base64Data = op.insert.image;
        const response = await fetch(base64Data);
        const blob = await response.blob();

        // Create a File object from the blob
        const fileName = `image_${Date.now()}_${i}.${blob.type.split("/")[1] || "png"}`;
        const file = new File([blob], fileName, { type: blob.type });

        // Start upload and store the promise
        const uploadPromise = (async () => {
          try {
            const uploadUrl = await uploadImage(file, userId);
            // Extract just the path part after bucket name
            const pathMatch = uploadUrl.match(/\/([^/]+)\/articles\/(.+)$/);
            if (pathMatch) {
              const relativePath = `/articles/${pathMatch[2]}`;
              imageReplacements.set(base64Data, relativePath);
            } else {
              console.error(
                "Could not extract path from uploadUrl:",
                uploadUrl
              );
            }
          } catch (error) {
            console.error("Failed to upload image:", error);
          }
        })();

        uploadPromises.push(uploadPromise);
      }
    }

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    // Second pass: replace the base64 images with paths
    for (let i = 0; i < delta.ops.length; i++) {
      const op = delta.ops[i];

      if (
        op.insert?.image &&
        typeof op.insert.image === "string" &&
        imageReplacements.has(op.insert.image)
      ) {
        // Replace with the relative path
        op.insert.image = imageReplacements.get(op.insert.image);
      }
    }
  }

  return {
    updatedContent: JSON.stringify(delta),
    uploadPromises,
  };
};
