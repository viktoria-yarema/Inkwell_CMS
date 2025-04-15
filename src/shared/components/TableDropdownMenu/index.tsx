import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/DropdownMenu";
import { EllipsisVertical } from "lucide-react";
import { FC } from "react";

type TableDropdownProps = {
  handleDelete: () => void;
  children: React.ReactNode;
};

const TableDropdownMenu: FC<TableDropdownProps> = ({ children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end w-full align-center pr-4">
          <button className="h-8 w-8 hover:bg-white cursor-pointer rounded-full flex-center">
            <EllipsisVertical className="size-4" />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropdownMenu;
