import { FC, PropsWithChildren } from "react";
import SideBar from "../../components/SideBar";

const PrivateLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <SideBar />
      {children}
    </div>
  );
};

export default PrivateLayout;
