import { ColumnDef } from "@tanstack/react-table";
import { Article, ArticleStatus } from "@/entities/articles/type";
import { Badge } from "@/shared/components/Badge";

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={status === ArticleStatus.PUBLISHED ? "default" : "outline"}
          color={status === ArticleStatus.PUBLISHED ? "success" : "ghost"}
          className="text-sm"
        >
          {status}
        </Badge>
      );
    },
  },
];
