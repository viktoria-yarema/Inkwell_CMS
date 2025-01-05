import { FC } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "@/app/routes/routing";

const PageHeader: FC = () => {
  const { pathname } = useLocation();
  const title = routes.find((route) => route.path === pathname)?.name;

  return (
    <div className="flex items-center gap-2">
      <h1 className="text-3xl font-bold uppercase">{title}</h1>
    </div>
  );
};

export default PageHeader;
