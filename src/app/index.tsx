import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";
import { FC, Suspense } from "react";
import { routes } from "../shared/routes/routing";
import { LoginPage } from "../modules/auth/pages/LoginPage";
import { ARTICLES_PATH, HOME_PATH, LOGIN_PATH } from "../shared/routes/paths";
import ReactQueryProvider from "@/shared/providers/ReactQueryProvider";
import PublicLayout from "./layouts/PublicLayout";

const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: HOME_PATH,
      element: <Navigate to={ARTICLES_PATH} />,
    },
    {
      path: ARTICLES_PATH,
      element: <PrivateLayout />,
      children: routes.map(({ path, Component }) => ({
        path,
        element: <Component />,
      })),
    },
    {
      path: LOGIN_PATH,
      element: (
        <PublicLayout>
          <LoginPage />
        </PublicLayout>
      ),
    },
  ]);

  return (
    <ReactQueryProvider>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </ReactQueryProvider>
  );
};

export default App;
