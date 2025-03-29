import { Button } from "@/shared/components/Button";
import { SelectOption } from "@/shared/components/SelectButton";
import QuillEditor from "@/shared/components/QuillEditor";
import ArticleTitle from "../../components/ArticleTitle";
import { STATUS_OPTIONS } from "../../constants";
import SelectButton from "@/shared/components/SelectButton";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUpdateArticleMutation } from "@/entities/articles/mutations/useUpdateArticleMutations";
import { useParams } from "react-router-dom";
import { getCachedArticleById } from "@/entities/articles/queries/useGetArticlesQuery";
import { ArticleStatus } from "@/entities/articles/type";

const EditArticlePage = () => {
  const { id } = useParams();
  const article = getCachedArticleById(id);

  const [selectedStatus, setSelectedStatus] = useState<SelectOption>(
    STATUS_OPTIONS[0]
  );
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: user } = useUserQuery();
  const { mutate: updateArticle, isPending: isPendingUpdateArticle } =
    useUpdateArticleMutation();

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setSelectedStatus(
        STATUS_OPTIONS.find((option) => option.value === article.status) ??
          STATUS_OPTIONS[0]
      );
    }
  }, [article]);

  const handleUpdateArticle = () => {
    if (!user?.id) {
      toast({
        title: "Opps!",
        description: "Please login to create an article",
        variant: "destructive",
      });
      return;
    }

    if (!title || !content || !user?.id || !article) {
      toast({
        title: "Error creating article",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    updateArticle(
      {
        ...article,
        title,
        content,
        status: selectedStatus.value as ArticleStatus,
      },
      {
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
          onClick={handleUpdateArticle}
          disabled={isPendingUpdateArticle}
          isLoading={isPendingUpdateArticle}
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

export default EditArticlePage;
