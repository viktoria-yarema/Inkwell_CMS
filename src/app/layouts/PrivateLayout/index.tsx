import { Navigate, Outlet } from "react-router-dom";
import SideBar from "@/app/components/SideBar";
import PageHeader from "@/app/components/PageHeader";
import { FC, PropsWithChildren } from "react";
import useAuthStore from "@/entities/auth/stores/useAuthStore";
import { LOGIN_PATH } from "@/shared/routes/paths";
import Toaster from "@/shared/components/Toaster";

const PrivateLayout: FC<PropsWithChildren> = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_PATH} />;
  }

  return (
    <main className="grid grid-cols-[300px_1fr] gap-6 overflow-hidden h-dvh">
      <SideBar />
      <div className="flex flex-col gap-6 py-4 h-dvh overflow-hidden">
        <PageHeader />
        <div className="flex flex-col pr-6 h-dvh overflow-y-scroll">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default PrivateLayout;
