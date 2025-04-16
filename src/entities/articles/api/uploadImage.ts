import api from "@/shared/api/apiMiddleware";

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/images/upload", formData, {
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
