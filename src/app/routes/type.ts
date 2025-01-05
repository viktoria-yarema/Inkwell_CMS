import { IconProps } from "../../shared/types/icon";

export type Route = {
  path: string;
  name: string;
  Icon: React.FC<IconProps>;
};
