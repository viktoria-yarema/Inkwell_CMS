import { Button } from "@/shared/components/Button";
import { useState } from "react";
import SelectButton, { SelectOption } from "@/shared/components/SelectButton";
import { STATUS_OPTIONS } from "../../constants";
import QuillEditor from "@/shared/components/QuillEditor";
import { useCreateArticleMutation } from "@/entities/articles/mutations/useCreateArticleMutation";
import { ArticleStatus } from "@/entities/articles/type";
import { useToast } from "@/shared/hooks/use-toast";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import ArticleTitle from "../../components/ArticleTitle";
import { invalidateArticlesQuery } from "@/entities/articles/queries/useGetArticlesQuery";

const CreateArticlePage = () => {
  const [selectedStatus, setSelectedStatus] = useState<SelectOption>(
    STATUS_OPTIONS[0]
  );
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: user } = useUserQuery();
  console.log(content, "content");
  const { mutate: createArticle, isPending: isPendingCreateArticle } =
    useCreateArticleMutation();

  const handleCreateArticle = () => {
    if (!user?.id) {
      toast({
        title: "Opps!",
        description: "Please login to create an article",
        variant: "destructive",
      });
      return;
    }

    if (!title || !content || !user?.id) {
      toast({
        title: "Error creating article",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    createArticle(
      {
        title,
        content,
        status: selectedStatus.value as ArticleStatus,
        authorId: user.id,
        tags: [],
      },
      {
        onSuccess: () => {
          invalidateArticlesQuery();
          toast({
            title: "Article created successfully",
            variant: "default",
          });
        },
        onError: (error) => {
          toast({
            title: "Error creating article",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="top-5 right-4 fixed flex gap-2">
        <SelectButton
          selected={selectedStatus}
          options={STATUS_OPTIONS}
          onClick={(option) => {
            setSelectedStatus(option);
          }}
          className="h-10 min-w-14"
        />
        <Button
          size="lg"
          onClick={handleCreateArticle}
          disabled={isPendingCreateArticle}
          isLoading={isPendingCreateArticle}
        >
          Save
        </Button>
      </div>
      <ArticleTitle title={title} setTitle={setTitle} />
      <QuillEditor
        value={content}
        onChange={setContent}
        className="min-h-[300px]"
      />
    </div>
  );
};

export default CreateArticlePage;
