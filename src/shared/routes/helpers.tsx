import { NestedRoute, Route } from "@/shared/routes/type";
import { RouteObject } from "react-router-dom";

const createMainRoute = ({ pathname, Component }: Route): RouteObject[] => {
  return Component ? [{ path: pathname, element: <Component /> }] : [];
};

const createNestedRoute = (nestedRoute?: NestedRoute[]): RouteObject[] => {
  return (
    nestedRoute?.map(({ pathname, Component }) => ({
      path: pathname,
      element: <Component />,
    })) ?? []
  );
};

export const generateRoutes = (routes: Route[]): RouteObject[] => {
  return routes.flatMap((route) => [
    ...createMainRoute(route),
    ...createNestedRoute(route.children),
  ]);
};
