import { Button } from "@/shared/components/Button";
import { columns } from "./columns";
import DataTable from "@/shared/components/DataTable";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetArticlesQuery } from "@/entities/articles/queries/useGetArticlesQuery";

const ArticlesPage = () => {
  const navigate = useNavigate();
  const { data: articles } = useGetArticlesQuery();

  return (
    <div>
      <Button
        className="text-lg font-semibold px-3 fixed top-6 right-6"
        size="lg"
        onClick={() => navigate("/articles/create")}
      >
        <Plus className="h-4 w-4" />
        Add Article
      </Button>
      <div className="mt-10">
        <DataTable columns={columns} data={articles ?? []} />
      </div>
    </div>
  );
};

export default ArticlesPage;
