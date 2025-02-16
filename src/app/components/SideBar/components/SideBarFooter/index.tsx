import { useLogoutMutation } from "@/entities/auth/mutations/useLogoutMutation";
import useAuthStore from "@/entities/auth/stores/useAuthStore";
import { Avatar, AvatarFallback } from "@/shared/components/Avatar";
import { LOGIN_PATH } from "@/shared/routes/paths";
import { getAvatarInitials } from "@/shared/utils/getAvatarInitials";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBarFooter = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { mutate: logoutMutation } = useLogoutMutation();

  const MOCK_USER = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const handleLogout = async () => {
    await logoutMutation(undefined, {
      onSuccess: () => {
        logout();
        navigate(LOGIN_PATH);
      },
    });
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
        onClick={handleLogout}
      >
        <LogOut size={20} />
      </button>
    </div>
  );
};

export default SideBarFooter;
