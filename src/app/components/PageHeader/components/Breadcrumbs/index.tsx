import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/Breadcrumb";
import { useLocation, useParams } from "react-router-dom";
import { routes } from "@/shared/routes/routing";
import { findNestedRoute } from "@/shared/routes/helpers";

type BreadcrumbItem = {
  type: "link" | "page";
  pathname: string;
  title: string;
};

const PageBreadcrumbs: FC = () => {
  const { id = "" } = useParams();
  const { pathname } = useLocation();

  const breadcrumbItems: BreadcrumbItem[] = routes.reduce<BreadcrumbItem[]>(
    (acc, route) => {
      if (route.pathname.includes(pathname.split("/")[1])) {
        if (route.children) {
          const childRoute = findNestedRoute(route.children, pathname, id);

          return [
            ...acc,
            {
              type: "link" as const,
              pathname: route.pathname,
              title: route.title,
            },
            ...(childRoute
              ? [
                  {
                    type: "page" as const,
                    pathname: childRoute.pathname,
                    title: childRoute.title || "",
                  },
                ]
              : []),
          ];
        }
      }

      return acc;
    },
    []
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item) => (
          <BreadcrumbItem key={item.pathname}>
            {item.type === "link" ? (
              <>
                <BreadcrumbLink to={item.pathname}>{item.title}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage className="text-stone-300">
                {item.title}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcrumbs;
