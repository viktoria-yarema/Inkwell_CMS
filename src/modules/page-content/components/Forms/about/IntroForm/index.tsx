import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import UploadImage from "@/shared/components/UploadImage";
import { Button } from "@/shared/components/Button";
import { FC, useEffect, useMemo } from "react";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import { AboutSections, PageContentVariants } from "@/entities/user/type";
import { useUpdateUserMutation } from "@/entities/user/mutations/useUpdateUserMutation";
import { useUploadPageImage } from "@/entities/user/hooks/useUploadPageImage";
import { getImageUrl } from "@/shared/utils/getImageUrl";
import { Textarea } from "@/shared/components/Textarea";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  imageUrl: z.instanceof(File).optional(),
});

const IntroForm: FC = () => {
  const { data: user } = useUserQuery();
  const pageContent = user?.pageContent;
  const content =
    pageContent?.[PageContentVariants.ABOUT]?.[AboutSections.INTRO];

  const { mutateAsync: updateUser, isPending: isSubmitting } =
    useUpdateUserMutation();
  const { handleUploadImage } = useUploadPageImage();

  const { control, handleSubmit, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      imageUrl: undefined,
    },
  });

  useEffect(() => {
    if (content?.title) {
      setValue("title", content.title);
    }

    if (content?.subtitle) {
      setValue("subtitle", content.subtitle);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.title, content?.subtitle, content?.imageUrl]);

  const newData = watch();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.imageUrl) {
      const imageUrl = await handleUploadImage({
        file: data.imageUrl,
        pageVariant: PageContentVariants.ABOUT,
        section: AboutSections.INTRO,
      });

      if (imageUrl && content && newData.title && newData.subtitle) {
        await updateUser({
          ...user,
          pageContent: {
            ...pageContent,
            [PageContentVariants.ABOUT]: {
              ...pageContent?.[PageContentVariants.ABOUT],
              [AboutSections.INTRO]: {
                ...content,
                ...newData,
                imageUrl: imageUrl,
              },
            },
          },
        });
      }
    }
  };

  const initialPreviewUrl = useMemo(
    () => getImageUrl(`page-content/${content?.imageUrl || ""}`, user?.id),
    [user?.id, content?.imageUrl]
  );

  return (
    <form className="flex flex-col gap-4">
      <Controller
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Title</Label>
            <Input {...field} />
          </div>
        )}
        name="title"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Subtitle</Label>
            <Textarea {...field} className="min-h-[80px]" />
          </div>
        )}
        name="subtitle"
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
                setValue("imageUrl", newValue);
              }}
            />
          </div>
        )}
        name="imageUrl"
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

export default IntroForm;
