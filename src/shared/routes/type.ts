import { FC } from "react";
import { IconProps } from "../types/icon";

export type NestedRoute = {
  title?: string;
  pathname: string;
  Component: FC;
};

export type Route = {
  title: string;
  pathname: string;
  Component: FC;
  Icon: React.FC<IconProps>;
  children: NestedRoute[];
};
