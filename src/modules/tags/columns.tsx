import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/DropdownMenu";
import { EllipsisVertical } from "lucide-react";
import { Tag } from "@/entities/tags/type";

type TagColumnsProps = {
  handleDeleteTag: (id: string) => void;
  handleUpdateTag: (id: string, name: string) => void;
};

export const getTagColumns = ({
  handleDeleteTag,
  handleUpdateTag,
}: TagColumnsProps): ColumnDef<Tag>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex-center h-8 w-8 rounded-full hover:bg-white p-0 cursor-pointer m-auto">
              <EllipsisVertical className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleUpdateTag(row.original.id, row.original.title);
              }}
            >
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTag(row.original.id);
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
