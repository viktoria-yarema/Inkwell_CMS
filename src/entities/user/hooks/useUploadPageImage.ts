import { useUploadPageContentImageMutation } from "../mutations/useUploadPageContentImageMutation";
import { PageContentVariants } from "../type";

type UploadPageImageProps = {
  file: File;
  pageVariant: PageContentVariants;
  section: string;
};

export const useUploadPageImage = () => {
  const { mutateAsync: mutateUploadImage } =
    useUploadPageContentImageMutation();

  const handleUploadImage = async ({
    file,
    pageVariant,
    section,
  }: UploadPageImageProps) => {
    const response = await mutateUploadImage({
      file,
      pageVariant,
      section,
    });

    const imageUrl = `${pageVariant}/${section}/${response.imageId}`;

    return imageUrl as string;
  };

  return { handleUploadImage };
};
