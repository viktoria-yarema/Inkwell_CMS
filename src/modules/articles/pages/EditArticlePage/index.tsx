import { Button } from "@/shared/components/Button";
import { SelectOption } from "@/shared/components/SelectButton";
import QuillEditor from "@/shared/components/QuillEditor";
import ArticleTitle from "../../components/ArticleTitle";
import { ARTICLE_LIMIT, STATUS_OPTIONS } from "../../constants";
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
import { processEditorImages } from "@/shared/utils/processEditorImages";
import { processEditorContent } from "@/shared/utils/processEditorContent";
import CoverImageUpload from "@/shared/components/CoverImageUpload";
import { uploadImage } from "@/entities/articles/api/uploadImage";
import { getImageUrl } from "@/shared/utils/getImageUrl";
const EditArticlePage = () => {
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState<SelectOption>(
    STATUS_OPTIONS[0]
  );
  const [selectedTags, setSelectedTags] = useState<MultiSelectItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(JSON.stringify({ ops: [] }));
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const { data: user, isSuccess: isSuccessUser } = useUserQuery();
  const { mutate: updateArticle, isPending: isPendingUpdateArticle } =
    useUpdateArticleMutation();
  const { data: tags = [], isSuccess: isSuccessTags } = useGetTagsQuery();

  const { toast } = useToast();

  const article = getCachedArticleById(id, ARTICLE_LIMIT);

  useEffect(() => {
    if (article && isSuccessTags && isSuccessUser) {
      setTitle(article.title);
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

      const processedContent = processEditorContent(
        article?.content ?? "",
        user?.id ?? ""
      );

      setContent(processedContent);
    }
  }, [article, tags, user?.id, isSuccessTags, isSuccessUser]);

  const handleUpdateArticle = async () => {
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

    try {
      setIsProcessingImages(true);

      let coverImageUrl = "";

      if (coverImage) {
        const coverImageUploadData = await uploadImage(coverImage);
        coverImageUrl = coverImageUploadData?.imageId;
      }

      const { updatedContent } = await processEditorImages(content);

      updateArticle(
        {
          ...article,
          title,
          content: updatedContent,
          status: selectedStatus.value as ArticleStatus,
          tags: selectedTags.map((tag) => tag.value),
          coverImage: `/${coverImageUrl}`,
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
          onSettled: () => {
            setIsProcessingImages(false);
          },
        }
      );
    } catch (error) {
      setIsProcessingImages(false);
      toast({
        title: "Error processing images",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
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
          disabled={isPendingUpdateArticle || isProcessingImages}
          isLoading={isPendingUpdateArticle || isProcessingImages}
        >
          Save
        </Button>
      </div>
      <CoverImageUpload
        initialImage={getImageUrl(
          `/articles${article?.coverImage}`,
          user?.id ?? ""
        )}
        onImageUpload={async (file) => {
          setCoverImage(file);
        }}
        onImageRemove={() => setCoverImage(null)}
      />
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
