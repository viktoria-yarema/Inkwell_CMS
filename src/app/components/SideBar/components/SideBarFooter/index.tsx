import { useLogoutMutation } from "@/entities/auth/mutations/useLogoutMutation";
import useAuthStore from "@/entities/auth/stores/useAuthStore";
import useUserQuery from "@/entities/user/queries/useUserQuery";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/shared/components/DropdownMenu";
import { LOGIN_PATH } from "@/shared/routes/paths";
import { useNavigate } from "react-router-dom";
import DrawerTrigger from "./components/DrawerTrigger";
import DrawerContent from "./components/DrawerContent";

const SideBarFooter = () => {
  const navigate = useNavigate();
  const { logout: logoutStore } = useAuthStore();
  const { mutate: logoutMutation } = useLogoutMutation();
  const { data: user } = useUserQuery();

  const handleLogout = async () => {
    await logoutMutation(undefined, {
      onSuccess: () => {
        logoutStore();
        navigate(LOGIN_PATH);
      },
    });
  };

  return (
    <div className="mx-4 mb-4">
      <DropdownMenu>
        <DrawerTrigger user={user} />
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={"right"}
          align="end"
          sideOffset={4}
        >
          <DrawerContent user={user} handleLogout={handleLogout} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SideBarFooter;
