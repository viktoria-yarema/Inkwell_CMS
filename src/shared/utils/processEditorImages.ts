import { uploadImage } from "@/entities/articles/api/uploadImage";

type ProcessImagesResult = {
  updatedContent: string;
  uploadPromises: Promise<void>[];
};

export const processEditorImages = async (
  content: string
): Promise<ProcessImagesResult> => {
  let delta;
  try {
    delta = JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse editor content:", error);
    throw new Error("Invalid editor content format");
  }

  const uploadPromises: Promise<void>[] = [];
  const imageReplacements = new Map<string, string>();

  if (delta.ops && Array.isArray(delta.ops)) {
    for (let i = 0; i < delta.ops.length; i++) {
      const op = delta.ops[i];

      if (
        op.insert?.image &&
        typeof op.insert.image === "string" &&
        op.insert.image.startsWith("data:")
      ) {
        const base64Data = op.insert.image;
        const response = await fetch(base64Data);
        const blob = await response.blob();

        const fileName = `image_${Date.now()}_${i}.${blob.type.split("/")[1] || "png"}`;
        const file = new File([blob], fileName, { type: blob.type });

        try {
          const uploadFileData = await uploadImage(file);
          const uploadUrl = uploadFileData.image.url;
          const pathMatch = uploadUrl.match(/\/([^/]+)\/articles\/(.+)$/);
          if (pathMatch) {
            const relativePath = `/articles/${pathMatch[2]}`;
            imageReplacements.set(base64Data, relativePath);

            op.insert.image = relativePath;
          } else {
            console.error("Could not extract path from uploadUrl:", uploadUrl);
          }
        } catch (error) {
          console.error("Failed to upload image:", error);
        }
      }
    }
  }

  let allReplaced = true;
  for (let i = 0; delta.ops && i < delta.ops.length; i++) {
    const op = delta.ops[i];
    if (
      op.insert?.image &&
      typeof op.insert.image === "string" &&
      op.insert.image.startsWith("data:")
    ) {
      allReplaced = false;
      console.warn("Found unreplaced base64 image in output");
    }
  }

  if (!allReplaced) {
    console.warn("Not all base64 images were replaced with paths");
  }

  return {
    updatedContent: JSON.stringify(delta),
    uploadPromises,
  };
};
