import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import {
  AboutSections,
  PageContent,
  PageContentVariants,
} from "@/entities/user/type";
import { Input } from "@/shared/components/Input";
import { Textarea } from "@/shared/components/Textarea";
import { Label } from "@/shared/components/Label";
import { Button } from "@/shared/components/Button";
import { useUpdatePageContentMutation } from "@/entities/user/mutations/useUpdatePageContentMutation";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const IntroForm: FC = () => {
  const { data: user } = useUserQuery();
  const pageContent = user?.pageContent as PageContent;
  const content = pageContent?.[PageContentVariants.ABOUT].intro;

  console.log(content, "content");

  const { mutateAsync: updatePageContent, isPending: isSubmitting } =
    useUpdatePageContentMutation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (content?.title) {
      setValue("title", content.title);
    }

    if (content?.content) {
      setValue("content", content.content);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.title, content?.content]);

  const newData = watch();

  const onSubmit = async () => {
    console.log(content, "outside");
    if (content && newData.title && newData.content) {
      console.log(newData, "newData");

      await updatePageContent({
        pageVariant: PageContentVariants.ABOUT,
        section: AboutSections.INTRO,
        content: {
          ...content,
          ...newData,
        },
      });
    } else {
      setError("title", { message: "Title is required" });
      setError("content", { message: "Content is required" });
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <Controller
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Title</Label>
            <Input {...field} error={errors.title?.message} />
          </div>
        )}
        name="title"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Subtitle</Label>
            <Textarea
              {...field}
              className="min-h-[80px]"
              error={errors.content?.message}
            />
          </div>
        )}
        name="content"
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
