import axios from "axios";

const bucketInstance = import.meta.env.VITE_GOOGLE_STORAGE_BUCKET;

export const uploadImage = async (file: File, userId: string) => {
  if (!bucketInstance) {
    throw new Error(
      "Bucket name is not defined in Vite environment variables."
    );
  }

  const fileName = `${Date.now()}-${file.name}`;

  const uploadUrl = `${bucketInstance}/${userId}/articles/${fileName}`;

  try {
    const response = await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
        withCredentials: false,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return uploadUrl;
    } else {
      throw new Error(`Upload failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
