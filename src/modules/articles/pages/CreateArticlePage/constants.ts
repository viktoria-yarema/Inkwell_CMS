import { CircleSlash, Loader } from "lucide-react";

export const EDITOR_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};

export const STATUS_OPTIONS = [
  { label: "Draft", value: "draft", color: "bg-gray-100", Icon: CircleSlash },
  {
    label: "Published",
    value: "published",
    color: "bg-lime-400/80",
    Icon: Loader,
  },
];
