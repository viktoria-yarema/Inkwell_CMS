import LogoIcon from "../../../shared/assets/icons/Logo";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../routes/routing";
import cn from "../../../shared/utils/cn";

const SideBar = () => {
  const pathname = useLocation().pathname;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex flex-col gap-4 h-screen bg-slate-100 w-[242px] text-slate-800">
      <div className="flex items-end gap-2 px-4 pt-4">
        <div className="flex items-center justify-center">
          <LogoIcon color="#1e293b" width={28} height={28} />
        </div>
        <p className="text-xl font-bold">Inkwell</p>
      </div>
      <hr className="border-slate-300" />
      <ul className="flex flex-col items-center gap-1 pr-4 pl-3">
        {routes.map(({ path, name, Icon }) => (
          <li
            key={path}
            className={cn(
              "flex items-center hover:bg-slate-200 rounded-lg p-2 w-full h-12 text-md font-semibold py-4 gap-1 cursor-pointer",
              {
                "bg-slate-200": isActive(path),
              }
            )}
          >
            <Icon color="#1e293b" />
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
