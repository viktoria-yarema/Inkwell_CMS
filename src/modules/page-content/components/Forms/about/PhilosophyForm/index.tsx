import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import { Button } from "@/shared/components/Button";
import { FC, useEffect } from "react";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import { AboutSections, PageContentVariants } from "@/entities/user/type";
import { useUpdateUserMutation } from "@/entities/user/mutations/useUpdateUserMutation";
import { Textarea } from "@/shared/components/Textarea";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const PhilosophyForm: FC = () => {
  const { data: user } = useUserQuery();
  const pageContent = user?.pageContent;
  const content =
    pageContent?.[PageContentVariants.ABOUT]?.[AboutSections.PHILOSOPHY];

  const { mutateAsync: updateUser, isPending: isSubmitting } =
    useUpdateUserMutation();

  const { control, handleSubmit, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
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
    if (content && newData.title && newData.content) {
      await updateUser({
        ...user,
        pageContent: {
          ...pageContent,
          [PageContentVariants.ABOUT]: {
            ...pageContent?.[PageContentVariants.ABOUT],
            [AboutSections.PHILOSOPHY]: {
              ...content,
              ...newData,
            },
          },
        },
      });
    }
  };

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
            <Label htmlFor={field.name}>Content</Label>
            <Textarea {...field} className="min-h-[80px]" />
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

export default PhilosophyForm;
