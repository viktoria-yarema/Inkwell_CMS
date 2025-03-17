import { FC } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "@/shared/routes/routing";

const PageHeader: FC = () => {
  const { pathname } = useLocation();
  const title = routes.find((route) => route.pathname === pathname)?.title;

  const nestedTitle = routes
    .find((route) => route.pathname.includes(pathname.split("/")[1]))
    ?.children.find((child) => child.pathname === pathname)?.title;

  return (
    <div className="flex items-center gap-2 h-12">
      <h1 className="text-2xl font-medium uppercase text-stone-300">
        {nestedTitle || title}
      </h1>
    </div>
  );
};

export default PageHeader;
