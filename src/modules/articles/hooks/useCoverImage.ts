import { uploadImage } from "@/entities/articles/api/uploadImage";
import { useState } from "react";

export const useCoverImage = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleCoverImage = async () => {
    let coverImageName = "";

    if (coverImage) {
      const coverImageUploadData = await uploadImage(coverImage);
      coverImageName = coverImageUploadData?.imageId;
    }

    return coverImageName;
  };

  return { setCoverImage, handleCoverImage, coverImage };
};
