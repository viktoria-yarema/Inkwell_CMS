import { Button } from "@/shared/components/Button";
import { SelectOption } from "@/shared/components/SelectButton";
import QuillEditor from "@/shared/components/QuillEditor";
import ArticleTitle from "../../components/ArticleTitle";
import { STATUS_OPTIONS } from "../../constants";
import SelectButton from "@/shared/components/SelectButton";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import { useEffect, useState } from "react";
import { useToast } from "@/shared/hooks/use-toast";
import { useUpdateArticleMutation } from "@/entities/articles/mutations/useUpdateArticleMutations";
import { useParams } from "react-router-dom";
import {
  getCachedArticleById,
  invalidateArticlesQuery,
} from "@/entities/articles/queries/useGetArticlesQuery";
import { ArticleStatus } from "@/entities/articles/type";
import { MultiSelect, MultiSelectItem } from "@/shared/components/MultiSelect";
import { useGetTagsQuery } from "@/entities/tags/queries/useGetTagsQuery";

const EditArticlePage = () => {
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState<SelectOption>(
    STATUS_OPTIONS[0]
  );
  const [selectedTags, setSelectedTags] = useState<MultiSelectItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(JSON.stringify({ ops: [] }));

  const { data: user } = useUserQuery();
  const { mutate: updateArticle, isPending: isPendingUpdateArticle } =
    useUpdateArticleMutation();
  const { data: tags = [], isLoading: isLoadingTags } = useGetTagsQuery();

  const { toast } = useToast();

  const article = getCachedArticleById(id);

  useEffect(() => {
    if (article && !isLoadingTags) {
      setTitle(article.title);
      setContent(article.content);
      setSelectedStatus(
        STATUS_OPTIONS.find((option) => option.value === article.status) ??
          STATUS_OPTIONS[0]
      );
      setSelectedTags(
        article.tags.map((tag) => {
          const tagsMap = new Map(tags.map((t) => [t.id, t]));

          return {
            value: tag ?? "",
            label: tagsMap.get(tag)?.title ?? "",
          };
        })
      );
    }
  }, [article, tags, isLoadingTags]);

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
        tags: selectedTags.map((tag) => tag.value),
      },

      {
        onSuccess: () => {
          invalidateArticlesQuery();
          toast({
            title: "Article updated successfully",
            variant: "default",
          });
        },
        onError: (error) => {
          toast({
            title: "Error updating article",
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
      <div className="flex flex-col gap-2">
        <MultiSelect
          items={
            tags.map((tag) => ({
              value: tag.id,
              label: tag.title,
            })) || []
          }
          selectedItems={selectedTags}
          setSelectedItems={setSelectedTags}
        />
        <QuillEditor
          value={content}
          onChange={setContent}
          className="min-h-[300px]"
        />
      </div>
    </div>
  );
};

export default EditArticlePage;
