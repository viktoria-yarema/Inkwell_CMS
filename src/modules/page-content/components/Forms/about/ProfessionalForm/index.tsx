import { useUpdateUserMutation } from "@/entities/user/mutations/useUpdateUserMutation";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import { AboutSections, PageContentVariants } from "@/entities/user/type";
import { professionalExperienceSchema } from "@/entities/user/validators/about";
import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";
import DatePicker from "@/shared/components/DatePicker";
import { Input } from "@/shared/components/Input";
import { Textarea } from "@/shared/components/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { PlusIcon, TrashIcon } from "lucide-react";
import { FC, useEffect } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

const ProfessionalForm: FC = () => {
  const { data: user } = useUserQuery();
  const pageContent = user?.pageContent;
  const content =
    pageContent?.[PageContentVariants.ABOUT]?.[
      AboutSections.PROFESSIONAL_EXPERIENCE
    ];

  const { mutateAsync: updateUser, isPending: isSubmitting } =
    useUpdateUserMutation();

  const { control, handleSubmit, setValue } = useForm<
    z.infer<typeof professionalExperienceSchema>
  >({
    resolver: zodResolver(professionalExperienceSchema),
    defaultValues: {
      title: content?.title || "",
      professionalExperience: content?.professionalExperience || [
        {
          jobTitle: "",
          companyName: "",
          description: "",
          startDate: undefined,
          endDate: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "professionalExperience",
  });

  
  useEffect(() => {
    if (content?.title) {
      setValue("title", content.title);
    }

    if (content?.professionalExperience) {
      setValue("professionalExperience", content.professionalExperience);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, setValue]);

  const onSubmit = async (
    data: z.infer<typeof professionalExperienceSchema>
  ) => {
    if (user && pageContent) {
      await updateUser({
        ...user,
        pageContent: {
          ...pageContent,
          [PageContentVariants.ABOUT]: {
            ...pageContent[PageContentVariants.ABOUT],
            [AboutSections.PROFESSIONAL_EXPERIENCE]: {
              title: data.title,
              professionalExperience: data.professionalExperience,
            },
          },
        },
      });
    }
  };

  const addNewExperience = () => {
    append({
      jobTitle: "",
      companyName: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mb-4">
        <Controller
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Section Title</Label>
              <Input {...field} placeholder="Professional Experience" />
            </div>
          )}
          name="title"
          control={control}
        />
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4">
          <Card className="bg-muted/15 py-6 px-4 max-w-4xl gap-4 flex flex-col flex-1">
            <div className="flex justify-between items-center">
              <p className="font-medium text-lg text-center">
                Professional Experience {index + 1}
              </p>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Controller
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Job Title</Label>
                      <Input {...field} />
                    </div>
                  )}
                  name={`professionalExperience.${index}.jobTitle`}
                  control={control}
                />
                <Controller
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Company Name</Label>
                      <Input {...field} />
                    </div>
                  )}
                  name={`professionalExperience.${index}.companyName`}
                  control={control}
                />
                <Controller
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Description</Label>
                      <Textarea {...field} className="min-h-[80px]" />
                    </div>
                  )}
                  name={`professionalExperience.${index}.description`}
                  control={control}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Controller
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Start Date</Label>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                  name={`professionalExperience.${index}.startDate`}
                  control={control}
                />
                <Controller
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">End Date</Label>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                  name={`professionalExperience.${index}.endDate`}
                  control={control}
                />
              </div>
            </div>
          </Card>
        </div>
      ))}

      <Button
        type="button"
        className="rounded-lg bg-blue-600 max-w-fit self-center px-4 py-2 shadow-sm hover:bg-blue-700 flex items-center gap-2"
        size="lg"
        onClick={addNewExperience}
      >
        <PlusIcon className="h-4 w-4" />
        Add Professional Experience
      </Button>

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

export default ProfessionalForm;
