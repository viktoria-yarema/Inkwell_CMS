import { Button } from "@/shared/components/Button";
import { getArticleColumns } from "./columns";
import DataTable from "@/shared/components/DataTable";
import { Plus } from "lucide-react";
import { generatePath, useNavigate } from "react-router-dom";
import { useGetArticlesQuery } from "@/entities/articles/queries/useGetArticlesQuery";
import { ARTICLE_PATH } from "@/shared/routes/paths";
import { useDeleteArticleMutation } from "@/entities/articles/mutations/useDeleteArticleMutation";
import DeleteModal from "../../shared/components/DeleteModal";
import { useState, useEffect } from "react";
import { Article } from "@/entities/articles/type";
import { ARTICLE_LIMIT } from "./constants";

const ArticlesPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );
  const [pageIndex, setPageIndex] = useState(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetArticlesQuery({ limit: ARTICLE_LIMIT });

  const { mutate: deleteArticle } = useDeleteArticleMutation();

  const handleDelete = (id: string) => {
    setSelectedArticleId(id);
    setOpen(true);
  };

  const handleUpdate = (id: string) => {
    navigate(generatePath(ARTICLE_PATH, { id }));
  };

  const columns = getArticleColumns({ handleDelete, handleUpdate });

  const currentPage = data?.pages[pageIndex]?.meta.page || 1;

  const articles: Article[] = data?.pages[pageIndex]?.articles || [];

  const totalPages = data?.pages[0]?.meta.totalPages || 1;

  useEffect(() => {
    if (data && pageIndex >= data.pages.length) {
      setPageIndex(Math.max(0, data.pages.length - 1));
    }
  }, [data, pageIndex]);

  const handleNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      if (pageIndex < data!.pages.length - 1) {
        setPageIndex(pageIndex + 1);
      } else {
        fetchNextPage().then(() => {
          setPageIndex(pageIndex + 1);
        });
      }
    }
  };

  const handlePreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Button
        className="text-lg font-semibold px-3 fixed top-5 right-6"
        size="lg"
        onClick={() => navigate(generatePath(ARTICLE_PATH, { id: "create" }))}
      >
        <Plus className="h-4 w-4" />
        Add Article
      </Button>
      <div className="mt-10">
        <DataTable
          columns={columns}
          data={articles}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      <DeleteModal
        open={open}
        onOpenChange={setOpen}
        title="Are you sure?"
        description="This will permanently delete your article and remove your data from our servers."
        onConfirm={() => {
          if (selectedArticleId) {
            deleteArticle(selectedArticleId);
          }
        }}
      />
    </div>
  );
};

export default ArticlesPage;
