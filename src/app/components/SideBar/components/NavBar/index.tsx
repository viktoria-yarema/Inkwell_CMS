import { routes } from "@/shared/routes/routing";
import cn from "@/shared/utils/cn";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const pathname = useLocation().pathname;
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex flex-col gap-4 h-screen bg-sidebar-background text-sidebar-foreground">
      <ul className="flex flex-col items-center gap-1 pr-4 pl-3">
        {routes.map(({ path, name, Icon }) => (
          <li
            key={path}
            className={cn(
              "flex items-center hover:bg-slate-100 font-semibold text-base rounded-lg p-2 w-full h-12 py-2 gap-1 cursor-pointer",
              { "bg-sidebar-accent": isActive(path) }
            )}
          >
            <Icon color="#3f4249" size={20} />
            <NavLink to={path}>{name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
