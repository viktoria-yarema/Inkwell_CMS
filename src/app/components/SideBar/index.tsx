import LogoIcon from "@/shared/assets/icons/Logo";
import SideBarFooter from "./components/SideBarFooter";
import NavBar from "./components/NavBar";

const SideBar = () => {
  return (
    <aside className="flex flex-col gap-4 h-screen text-sidebar-foreground border-r border-sidebar-border border-solid pb-4 bg-sidebar-background">
      <div className="flex items-end gap-2 px-4 pt-4">
        <div className="flex items-center justify-center">
          <LogoIcon color="#fff" size={28} />
        </div>
        <p className="text-xl font-bold">Inkwell</p>
      </div>
      <hr className="border-sidebar-border" />
      <NavBar />
      <SideBarFooter />
    </aside>
  );
};

export default SideBar;
