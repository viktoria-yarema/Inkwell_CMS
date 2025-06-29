import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import { Button } from "@/shared/components/Button";
import { FC, useEffect } from "react";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import { HomeSections, PageContentVariants } from "@/entities/user/type";
import { Textarea } from "@/shared/components/Textarea";
import { useUpdatePageContentMutation } from "@/entities/user/mutations/useUpdatePageContentMutation";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  copyright: z.string().min(1, "Copyright is required"),
});

const FooterForm: FC = () => {
  const { data: user } = useUserQuery();
  const pageContent = user?.pageContent;
  const content =
    pageContent?.[PageContentVariants.HOME]?.[HomeSections.FOOTER];

  const { mutateAsync: updatePageContent, isPending: isSubmitting } =
    useUpdatePageContentMutation();

  const { control, handleSubmit, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      copyright: "",
    },
  });

  useEffect(() => {
    if (content?.description) {
      setValue("description", content.description);
    }

    if (content?.copyright) {
      setValue("copyright", content.copyright);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.description, content?.copyright]);

  const newData = watch();

  const onSubmit = async () => {
    if (content && newData.description && newData.copyright) {
      await updatePageContent({
        pageVariant: PageContentVariants.HOME,
        section: HomeSections.FOOTER,
        content: {
          ...content,
          ...newData,
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
        name="description"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Subtitle</Label>
            <Textarea {...field} className="min-h-[80px]" />
          </div>
        )}
        name="copyright"
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

export default FooterForm;
