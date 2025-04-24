import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenuItem } from "@/shared/components/DropdownMenu";
import { InkwellIcon, Tag } from "@/entities/tags/type";
import TableDropdownMenu from "@/shared/components/TableDropdownMenu";
import { iconComponents } from "./constants";

type TagColumnsProps = {
  handleDeleteTag: (id: string) => void;
  handleUpdateTag: (id: string, name: string) => void;
};

export const getTagColumns = ({
  handleDeleteTag,
  handleUpdateTag,
}: TagColumnsProps): ColumnDef<Tag>[] => [
  {
    id: "icon",
    accessorKey: "icon",
    header: "Icon",
    enableHiding: false,
    size: 24,
    cell: ({ row }) => {
      const Icon = iconComponents[row.original.icon as InkwellIcon];
      return (
        <div className="flex w-12">
          {Icon ? <Icon color="gray" size={16} /> : "-"}
        </div>
      );
    },
  },
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
        <TableDropdownMenu
          handleDelete={() => handleDeleteTag(row.original.id)}
        >
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
        </TableDropdownMenu>
      );
    },
  },
];
