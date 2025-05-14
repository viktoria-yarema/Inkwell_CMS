import { Button } from "@/shared/components/Button";
import DataTable from "@/shared/components/DataTable";
import { Plus } from "lucide-react";
import { generatePath, useNavigate } from "react-router-dom";
import { ARTICLE_PATH } from "@/shared/routes/paths";
import DeleteModal from "../../shared/components/DeleteModal";
import { useArticles, ArticlesProvider } from "./context";

const ArticlesContainer = () => (
  <ArticlesProvider>
    <ArticlesPage />
  </ArticlesProvider>
);

const ArticlesPage = () => {
  const navigate = useNavigate();
  const {
    columns,
    deleteArticle,
    selectedArticleId,
    currentPage,
    totalPages,
    articles,
    handleNextPage,
    handlePreviousPage,
    open,
    setOpen,
  } = useArticles();

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

export default ArticlesContainer;
