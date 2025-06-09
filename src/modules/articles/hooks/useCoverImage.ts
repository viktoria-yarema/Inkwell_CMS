import { uploadArticleImage } from "@/entities/articles/api/uploadArticleImage";
import { useState } from "react";

export const useCoverImage = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleCoverImage = async () => {
    let coverImageName = "";

    if (coverImage) {
      const coverImageUploadData = await uploadArticleImage(coverImage);
      coverImageName = coverImageUploadData?.imageId;
    }

    return coverImageName;
  };

  return { setCoverImage, handleCoverImage, coverImage };
};
