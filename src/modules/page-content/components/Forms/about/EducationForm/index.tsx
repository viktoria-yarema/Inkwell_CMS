import { useUpdateUserMutation } from "@/entities/user/mutations/useUpdateUserMutation";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import {
  AboutPageContent,
  AboutSections,
  PageContentVariants,
} from "@/entities/user/type";
import { educationSchema } from "@/entities/user/validators/about";
import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";
import DatePicker from "@/shared/components/DatePicker";
import { Input } from "@/shared/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { PlusIcon, TrashIcon } from "lucide-react";
import { FC, useEffect } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  education: educationSchema,
});

const EducationForm: FC = () => {
  const { data: user } = useUserQuery();
  const pageContent = user?.pageContent;
  const content = pageContent?.[PageContentVariants.ABOUT] as AboutPageContent;

  const { mutateAsync: updateUser, isPending: isSubmitting } =
    useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: [
        {
          title: "",
          schoolName: "",
          location: "",
          startDate: undefined,
          endDate: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    if (content.education) {
      setValue("education", content.education || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, setValue]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (user && pageContent) {
      await updateUser({
        ...user,
        pageContent: {
          ...pageContent,
          [PageContentVariants.ABOUT]: {
            ...pageContent[PageContentVariants.ABOUT],
            [AboutSections.EDUCATION]: data.education,
          },
        },
      });
    }
  };

  const addNewEducation = () => {
    append({
      title: "",
      schoolName: "",
      location: "",
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <form className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4">
          <Card className="bg-muted/15 py-6 px-4 max-w-4xl gap-4 flex flex-col flex-1">
            <div className="flex justify-between items-center">
              <p className="font-medium text-lg text-center">
                Education {index + 1}
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
                  name={`education.${index}.title`}
                  control={control}
                />
                <Controller
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Company Name</Label>
                      <Input {...field} />
                    </div>
                  )}
                  name={`education.${index}.schoolName`}
                  control={control}
                />
                <Controller
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Location</Label>
                      <Input {...field} />
                    </div>
                  )}
                  name={`education.${index}.location`}
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
                  name={`education.${index}.startDate`}
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
                  name={`education.${index}.endDate`}
                  control={control}
                />
              </div>
            </div>
          </Card>
        </div>
      ))}

      <Button
        type="button"
        className="rounded-lg border text-blue-500 bg-transparent hover:bg-transparent hover:text-blue-700 border-blue-600 max-w-fit self-center px-4 py-2 shadow-sm  flex items-center gap-2"
        size="lg"
        onClick={addNewEducation}
      >
        <PlusIcon className="h-4 w-4" />
        Add Education
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

export default EducationForm;
