import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";
import { FC, Suspense } from "react";
import { routes } from "./routes/routing";
import { LoginPage } from "./layouts/Login";

const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLayout />,
      children: routes.map(({ path, Component }) => ({
        path,
        element: <Component />,
      })),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
