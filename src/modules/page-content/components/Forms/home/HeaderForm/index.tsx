import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import UploadImage from "@/shared/components/UploadImage";
import { Button } from "@/shared/components/Button";
import { FC, useEffect, useMemo } from "react";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import { HomeSections, StaticPageContentVariants } from "@/entities/user/type";
import { useUpdateUserMutation } from "@/entities/user/mutations/useUpdateUserMutation";
import { useUploadPageImage } from "@/entities/user/hooks/useUploadPageImage";
import { getImageUrl } from "@/shared/utils/getImageUrl";

const formSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  logoUrl: z.instanceof(File).optional(),
});

const HeaderForm: FC = () => {
  const { data: user } = useUserQuery();
  const pageContent = user?.pageContent;
  const content =
    pageContent?.[StaticPageContentVariants.HOME]?.[HomeSections.HEADER];

  const { mutateAsync: updateUser, isPending: isSubmitting } =
    useUpdateUserMutation();
  const { handleUploadImage } = useUploadPageImage();

  const { control, handleSubmit, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      logoUrl: undefined,
    },
  });

  useEffect(() => {
    if (content?.brandName) {
      setValue("brandName", content.brandName);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.brandName]);

  const newData = watch();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.logoUrl) {
      const imageUrl = await handleUploadImage({
        file: data.logoUrl,
        pageVariant: StaticPageContentVariants.HOME,
        section: HomeSections.HEADER,
      });

      if (imageUrl && content && newData.brandName && newData.logoUrl) {
        await updateUser({
          ...user,
          pageContent: {
            ...pageContent,
            [StaticPageContentVariants.HOME]: {
              ...pageContent?.[StaticPageContentVariants.HOME],
              [HomeSections.HEADER]: {
                ...content,
                ...newData,
                logoUrl: imageUrl,
              },
            },
          },
        });
      }
    }
  };

  const initialPreviewUrl = useMemo(
    () => getImageUrl(`page-content${content?.logoUrl || ""}`, user?.id),
    [user?.id, content?.logoUrl]
  );

  console.log(initialPreviewUrl, "initialPreviewUrl");

  return (
    <form className="flex flex-col gap-4">
      <Controller
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Brand Name</Label>
            <Input {...field} />
          </div>
        )}
        name="brandName"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}></Label>
            <UploadImage
              isSubmitting={isSubmitting}
              initialPreviewUrl={initialPreviewUrl}
              onFieldUpdate={(newValue) => {
                setValue("logoUrl", newValue);
              }}
            />
          </div>
        )}
        name="logoUrl"
        control={control}
      />
      <Button
        type="submit"
        className="w-fit self-end"
        size="lg"
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
      >
        Save
      </Button>
    </form>
  );
};

export default HeaderForm;
