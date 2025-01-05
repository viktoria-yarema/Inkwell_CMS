import { Outlet } from "react-router-dom";
import SideBar from "@/app/components/SideBar";
import PageHeader from "@/app/components/PageHeader";

const PrivateLayout = () => {
  return (
    <main className="flex gap-6">
      <SideBar />
      <div className="flex flex-col gap-6 py-4">
        <PageHeader />
        <Outlet />
      </div>
    </main>
  );
};

export default PrivateLayout;
