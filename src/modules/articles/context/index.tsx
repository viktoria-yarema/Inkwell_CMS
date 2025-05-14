import { createContext } from "@/shared/utils/context";
import { ArticlesContextType } from "./type";
import { getArticleColumns } from "../columns";
import { generatePath, useNavigate } from "react-router-dom";
import { useGetArticlesQuery } from "@/entities/articles/queries/useGetArticlesQuery";
import { ARTICLE_PATH } from "@/shared/routes/paths";
import { useDeleteArticleMutation } from "@/entities/articles/mutations/useDeleteArticleMutation";
import { useState, useEffect } from "react";
import { Article } from "@/entities/articles/type";
import { ARTICLE_LIMIT } from "../constants";

const [Provider, useArticles] = createContext<ArticlesContextType>({
  name: "ArticlesContext",
  hookName: "useArticles",
  providerName: "ArticlesProvider",
});

const ArticlesProvider = ({ children }: { children: React.ReactNode }) => {
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

  const value = {
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
  };

  return <Provider value={value}>{children}</Provider>;
};

export { ArticlesProvider, useArticles };
