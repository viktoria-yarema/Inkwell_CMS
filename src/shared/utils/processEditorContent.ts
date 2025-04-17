import { decodeHtmlEntities } from "./decodeHtmlEntities";

const getImageUrl = (imageUrl: string, userId = "test") => {
  if (!imageUrl) return imageUrl;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const bucketPath = import.meta.env.VITE_GOOGLE_STORAGE_BUCKET || "bucket";
  return `${bucketPath}/${userId}${imageUrl}`;
};

export const processEditorContent = (
  content: string,
  userId: string
): string => {
  if (!content) return content;

  try {
    const decodedValue = decodeHtmlEntities(content);
    const delta = JSON.parse(decodedValue);

    if (delta.ops && Array.isArray(delta.ops)) {
      for (let i = 0; i < delta.ops.length; i++) {
        const op = delta.ops[i];

        if (op.insert?.image && typeof op.insert.image === "string") {
          const imageUrl = getImageUrl(op.insert.image, userId);
          op.insert.image = imageUrl;
        }
      }
    }

    return JSON.stringify(delta);
  } catch (error) {
    console.error("Failed to process editor content:", error);
    return content;
  }
};
