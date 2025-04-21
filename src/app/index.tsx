import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";
import { FC, Suspense } from "react";
import { routes } from "../shared/routes/routing";
import { LoginPage } from "../modules/auth/pages/LoginPage";
import {
  ARTICLES_PATH,
  HOME_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
} from "../shared/routes/paths";
import ReactQueryProvider from "@/shared/providers/ReactQueryProvider";
import PublicLayout from "./layouts/PublicLayout";
import { generateRoutes } from "../shared/routes/helpers";
import SignupPage from "@/modules/auth/pages/SignupPage";

const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: HOME_PATH,
      element: <Navigate to={ARTICLES_PATH} />,
    },
    {
      id: "private-layout",
      path: "/",
      element: <PrivateLayout />,
      children: generateRoutes(routes),
    },
    {
      path: LOGIN_PATH,
      element: (
        <PublicLayout>
          <LoginPage />
        </PublicLayout>
      ),
    },
    {
      path: SIGNUP_PATH,
      element: (
        <PublicLayout>
          <SignupPage />
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
