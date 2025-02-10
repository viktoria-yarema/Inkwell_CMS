import { HOME_PATH } from "@/shared/routes/paths";
import useAuthStore from "@/entities/auth/stores/useAuthStore";
import { PropsWithChildren } from "react";
import { FC } from "react";
import { Navigate } from "react-router-dom";

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={HOME_PATH} />;
  }

  return <div>{children}</div>;
};

export default PublicLayout;
