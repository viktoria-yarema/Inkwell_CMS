import { User as UserType } from "@/entities/user/type";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/shared/components/DropdownMenu";
import { LogOut, User } from "lucide-react";
import UserAvatar from "../UserAvatar";

type DrawerContentProps = {
  user?: UserType;
  handleLogout: () => void;
};

const DrawerContent = ({ user, handleLogout }: DrawerContentProps) => {
  const canShowFullName = !!user?.firstName && !!user?.lastName;
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal text-gray-400">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserAvatar user={user} />
          <div className="grid flex-1 text-left text-sm leading-tight">
            {canShowFullName && (
              <span className="truncate font-semibold">{fullName}</span>
            )}
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <User size={16} />
        Profile
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut size={16} />
        Log out
      </DropdownMenuItem>
    </>
  );
};

export default DrawerContent;
