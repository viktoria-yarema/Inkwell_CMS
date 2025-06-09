export const getImageUrl = (imageUrl: string, userId = "test-user-id") => {
  if (!imageUrl) return imageUrl;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const bucketPath = import.meta.env.VITE_GOOGLE_STORAGE_BUCKET || "bucket";
  return `${bucketPath}/${userId}/${imageUrl}`;
};
