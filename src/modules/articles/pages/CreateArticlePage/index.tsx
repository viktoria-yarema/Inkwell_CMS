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
import { MultiSelect, MultiSelectItem } from "@/shared/components/MultiSelect";
import { useGetTagsQuery } from "@/entities/tags/queries/useGetTagsQuery";
import { processEditorImages } from "@/shared/utils/processEditorImages";
import { useNavigate } from "react-router-dom";
import { ARTICLES_PATH } from "@/shared/routes/paths";
import CoverImageUpload from "@/shared/components/CoverImageUpload";
import { useCoverImage } from "../../hooks/useCoverImage";

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<SelectOption>(
    STATUS_OPTIONS[0]
  );
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: user } = useUserQuery();
  const { data: tags = [] } = useGetTagsQuery();
  const [selectedTags, setSelectedTags] = useState<MultiSelectItem[]>([]);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const { setCoverImage, handleCoverImage, coverImage } = useCoverImage();

  const { mutate: createArticle, isPending: isPendingCreateArticle } =
    useCreateArticleMutation();

  const handleCreateArticle = async () => {
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

    try {
      setIsProcessingImages(true);

      const [updatedContent, coverImageName] = await Promise.all([
        processEditorImages(content),
        handleCoverImage(),
      ]);

      createArticle(
        {
          title,
          content: updatedContent.updatedContent,
          status: selectedStatus.value as ArticleStatus,
          authorId: user.id,
          tags: selectedTags.map((tag) => tag.value),
          description: "test",
          coverImage: `${coverImageName}`,
        },
        {
          onSuccess: () => {
            invalidateArticlesQuery();
            toast({
              title: "Article created successfully",
              variant: "default",
            });
            navigate(ARTICLES_PATH);
          },
          onError: (error) => {
            toast({
              title: "Error creating article",
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
          onClick={handleCreateArticle}
          disabled={isPendingCreateArticle || isProcessingImages}
          isLoading={isPendingCreateArticle || isProcessingImages}
        >
          Save
        </Button>
      </div>
      <CoverImageUpload
        initialImage={coverImage?.name || undefined}
        onImageUpload={async (file) => {
          setCoverImage(file);
        }}
        onImageRemove={() => setCoverImage(null)}
      />
      <ArticleTitle title={title} setTitle={setTitle} />
      <div className="flex flex-col gap-2">
        <MultiSelect
          items={
            tags?.map((tag) => ({
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

export default CreateArticlePage;
