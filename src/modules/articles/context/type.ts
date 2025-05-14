import { Article } from "@/entities/articles/type";
import { ColumnDef } from "@tanstack/react-table";

export type ArticlesContextType = {
  deleteArticle: (id: string) => void;
  selectedArticleId: string | null;
  currentPage: number;
  totalPages: number;
  articles: Article[];
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  columns: ColumnDef<Article>[];
};
