import { useUpdatePageContentMutation } from "@/entities/user/mutations/useUpdatePageContentMutation";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import { AboutSections, PageContentVariants } from "@/entities/user/type";
import { skillsSchema } from "@/entities/user/validators/about";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, TrashIcon } from "lucide-react";
import { FC, useEffect } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  skills: skillsSchema,
});

const SkillsForm: FC = () => {
  const { data: user } = useUserQuery();
  const { mutateAsync: updatePageContent, isPending: isSubmitting } =
    useUpdatePageContentMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills" as never,
  });

  const pageContent = user?.pageContent;
  const content =
    pageContent?.[PageContentVariants.ABOUT]?.[AboutSections.SKILLS];

  useEffect(() => {
    if (content) {
      setValue("skills", content);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (user && pageContent) {
      await updatePageContent({
        pageVariant: PageContentVariants.ABOUT,
        section: AboutSections.SKILLS,
        content: data.skills,
      });
    }
  };

  const addNewSkill = () => {
    append("");
  };

  return (
    <form className="flex flex-col gap-6">
      <p className="text-lg font-medium text-left">Skills</p>
      <div className="flex gap-4 flex-wrap">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4">
            <Controller
              render={({ field }) => (
                <div className="flex gap-2 items-center">
                  <Input {...field} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
              name={`skills.${index}`}
              control={control}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="rounded-lg border text-blue-500 bg-transparent hover:bg-transparent hover:text-blue-700 border-blue-600 max-w-fit self-center px-4 py-2 shadow-sm  flex items-center gap-2"
        size="lg"
        onClick={addNewSkill}
      >
        <PlusIcon className="h-4 w-4" />
        Add Skill
      </Button>
      <Button
        type="submit"
        className="w-fit self-end"
        size="lg"
        disabled={isSubmitting || !isDirty}
        onClick={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
      >
        Save
      </Button>
    </form>
  );
};

export default SkillsForm;
