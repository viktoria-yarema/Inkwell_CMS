import LogoIcon from "../../../shared/assets/icons/Logo";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routing";

const SideBar = () => {
  return (
    <nav className="flex flex-col gap-4 h-screen bg-gray-800 w-[200px] text-white p-4">
      <div className="flex items-end gap-2 ml-2">
        <div className="flex items-center justify-center">
          <LogoIcon color="white" width={28} height={28} />
        </div>
        <p className="text-xl font-bold">Inkwell</p>
      </div>
      <hr className="border-gray-700" />
      <ul className="flex flex-col items-center gap-1">
        {routes.map(({ path, name, Icon }) => (
          <li className="flex items-center hover:bg-gray-600 rounded-md p-2 w-full h-8 text-md font-medium py-4 gap-1">
            <Icon />
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
