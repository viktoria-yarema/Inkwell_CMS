import { decodeHtmlEntities } from "./decodeHtmlEntities";
import { getImageUrl } from "./getImageUrl";

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
