import { FC } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "@/shared/routes/routing";
import PageBreadcrumbs from "./components/Breadcrumbs";

const PageHeader: FC = () => {
  const { pathname } = useLocation();

  const title = routes.find((route) => route.pathname === pathname)?.title;

  return (
    <div className="flex items-center gap-2 h-12">
      {title ? (
        <h1 className="text-3xl font-medium uppercase text-stone-300">
          {title}
        </h1>
      ) : (
        <PageBreadcrumbs />
      )}
    </div>
  );
};

export default PageHeader;
