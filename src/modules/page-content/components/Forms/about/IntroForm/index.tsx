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
import { useUpdateUserMutation } from "@/entities/user/mutations/useUpdateUserMutation";
import { Input } from "@/shared/components/Input";
import { Textarea } from "@/shared/components/Textarea";
import { Label } from "@/shared/components/Label";
import { Button } from "@/shared/components/Button";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
});

const IntroForm: FC = () => {
  const { data: user } = useUserQuery();
  const pageContent = user?.pageContent as PageContent;
  const content = pageContent?.[PageContentVariants.ABOUT].intro;

  const { mutateAsync: updateUser, isPending: isSubmitting } =
    useUpdateUserMutation();

  const { control, handleSubmit, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
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

  const onSubmit = async () => {
    if (content && newData.title && newData.subtitle) {
      await updateUser({
        ...user,
        pageContent: {
          ...pageContent,
          [PageContentVariants.ABOUT]: {
            ...pageContent?.[PageContentVariants.ABOUT],
            [AboutSections.INTRO]: {
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
            <Label htmlFor={field.name}>Subtitle</Label>
            <Textarea {...field} className="min-h-[80px]" />
          </div>
        )}
        name="subtitle"
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
