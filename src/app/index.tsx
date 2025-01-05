import { FC } from "react";
import { Outlet } from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";

const App: FC = () => {
  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default App;
