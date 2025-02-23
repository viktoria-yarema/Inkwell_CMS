import { ColumnDef } from "@tanstack/react-table";
import { Article, ArticleStatus } from "@/entities/articles/type";
import { Badge } from "@/shared/components/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/DropdownMenu";
import { EllipsisVertical } from "lucide-react";

type ArticleColumnsProps = {
  handleDelete: (id: string) => void;
};

export const getArticleColumns = ({
  handleDelete,
}: ArticleColumnsProps): ColumnDef<Article>[] => [
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
          className="text-xs px-2 py-1"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // const article = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex-center h-8 w-8 rounded-full hover:bg-white p-0 cursor-pointer">
              <EllipsisVertical className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.original.id);
              }}
              className="text-red-500 !hover:bg-red-500 !hover:text-white"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
