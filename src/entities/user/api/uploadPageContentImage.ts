import api from "@/shared/api/apiMiddleware";
import { UploadPageContentImageRequest } from "../type";

export const uploadPageContentImage = async ({
  file,
  pageVariant,
  section,
}: UploadPageContentImageRequest) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pageVariant", pageVariant);
    formData.append("section", section);

    const response = await api.post("/images/upload-page-content", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Upload failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
