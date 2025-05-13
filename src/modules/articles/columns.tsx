import { ColumnDef } from "@tanstack/react-table";
import { Article, ArticleStatus } from "@/entities/articles/type";
import { Badge } from "@/shared/components/Badge";
import TableDropdownMenu from "@/shared/components/TableDropdownMenu";
import { DropdownMenuItem } from "@/shared/components/DropdownMenu";

type ArticleColumnsProps = {
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
};

export const getArticleColumns = ({
  handleDelete,
  handleUpdate,
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
      return (
        <TableDropdownMenu handleDelete={() => handleDelete(row.original.id)}>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              handleUpdate(row.original.id);
            }}
          >
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              handleDelete(row.original.id);
            }}
            className="text-red-500 !hover:bg-red-500 !hover:text-white"
          >
            Delete
          </DropdownMenuItem>
        </TableDropdownMenu>
      );
    },
  },
];
