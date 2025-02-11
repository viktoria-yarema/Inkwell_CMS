import useAuthStore from "@/entities/auth/stores/useAuthStore";
import { Avatar, AvatarFallback } from "@/shared/components/Avatar";
import { getAvatarInitials } from "@/shared/utils/getAvatarInitials";
import { LogOut } from "lucide-react";

const SideBarFooter = () => {
  const { logout } = useAuthStore();

  const MOCK_USER = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="flex-between bg-sidebar-accent rounded-lg mx-4 py-3 px-2 hover:bg-slate-100 cursor-pointer">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="bg-white text-sidebar-foreground font-semibold">
            {getAvatarInitials(MOCK_USER.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-xs font-semibold">{MOCK_USER.name}</p>
          <p className="text-xs font-semibold">{MOCK_USER.email}</p>
        </div>
      </div>
      <button
        className="flex-center hover:bg-white rounded-lg p-1 h-10 w-10"
        onClick={logout}
      >
        <LogOut size={20} />
      </button>
    </div>
  );
};

export default SideBarFooter;
