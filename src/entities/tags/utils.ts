import { Tag } from "./type";
import { format, parseISO } from "date-fns";

export const formatTag = (tag: Tag): Tag => {
  return {
    ...tag,
    createdAt: format(parseISO(tag.createdAt as string), "dd MMMM yyyy"),
    updatedAt: format(parseISO(tag.updatedAt as string), "dd MMMM yyyy"),
  };
};
