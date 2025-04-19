import { DropdownMenuTrigger } from "@/shared/components/DropdownMenu";
import { ChevronsUpDown } from "lucide-react";
import { FC } from "react";
import UserAvatar from "../UserAvatar";
import { User } from "@/entities/user/type";

type DrawerTriggerProps = {
  user?: User;
};

const DrawerTrigger: FC<DrawerTriggerProps> = ({ user }) => {
  const canShowFullName = !!user?.firstName && !!user?.lastName;
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <DropdownMenuTrigger asChild>
      <div className="flex-between bg-sidebar-accent rounded-lg py-3 px-2 hover:bg-slate-100 cursor-pointer">
        <div className="flex items-center gap-2">
          <UserAvatar user={user} />
          <div className="flex flex-col">
            {canShowFullName && (
              <p className="text-xs font-semibold">{fullName}</p>
            )}
            {user?.email && (
              <p className="text-xs font-semibold">{user?.email}</p>
            )}
          </div>
        </div>
        <ChevronsUpDown className="ml-auto size-4" />
      </div>
    </DropdownMenuTrigger>
  );
};

export default DrawerTrigger;
