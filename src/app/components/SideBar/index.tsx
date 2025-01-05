import LogoIcon from "@/shared/assets/icons/Logo";
import { Avatar, AvatarFallback } from "@/shared/components/Avatar";
import NavBar from "./components/NavBar";
import { getAvatarInitials } from "@/shared/utils/getAvatarInitials";

const SideBar = () => {
  const MOCK_USER = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <aside className="flex flex-col gap-4 h-screen bg-sidebar-primary w-[242px] text-white">
      <div className="flex items-end gap-2 px-4 pt-4">
        <div className="flex items-center justify-center">
          <LogoIcon color="#fff" width={28} height={28} />
        </div>
        <p className="text-xl font-bold">Inkwell</p>
      </div>
      <hr className="border-white/10" />
      <NavBar />
      <div className="flex items-center p-4">
        <Avatar>
          <AvatarFallback className="bg-white/30 text-primary">
            {getAvatarInitials(MOCK_USER.name)}
          </AvatarFallback>
        </Avatar>
      </div>
    </aside>
  );
};

export default SideBar;
