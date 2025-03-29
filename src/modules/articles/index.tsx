import { Button } from "@/shared/components/Button";
import { getArticleColumns } from "./columns";
import DataTable from "@/shared/components/DataTable";
import { Plus } from "lucide-react";
import { generatePath, useNavigate } from "react-router-dom";
import { useGetArticlesQuery } from "@/entities/articles/queries/useGetArticlesQuery";
import { ARTICLE_PATH } from "@/shared/routes/paths";
import { useDeleteArticleMutation } from "@/entities/articles/mutations/useDeleteArticleMutation";
import DeleteModal from "./components/DeleteModal";
import { useState } from "react";

const ArticlesPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );
  const { data: articles } = useGetArticlesQuery();
  const { mutate: deleteArticle } = useDeleteArticleMutation();

  const handleDelete = (id: string) => {
    setSelectedArticleId(id);
    setOpen(true);
  };

  const columns = getArticleColumns({ handleDelete });

  return (
    <div className="flex flex-col gap-4 w-full">
      <Button
        className="text-lg font-semibold px-3 fixed top-6 right-6"
        size="lg"
        onClick={() => navigate(generatePath(ARTICLE_PATH, { id: "create" }))}
      >
        <Plus className="h-4 w-4" />
        Add Article
      </Button>
      <div className="mt-10">
        <DataTable
          columns={columns}
          data={articles ?? []}
          onRowClick={(row) => {
            navigate(generatePath(ARTICLE_PATH, { id: row.id }));
          }}
        />
      </div>
      <DeleteModal
        open={open}
        onOpenChange={setOpen}
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
