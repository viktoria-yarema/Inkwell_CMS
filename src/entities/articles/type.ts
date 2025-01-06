import { Tag } from "../tags/type";

export type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  status: ArticleStatus;
  tags: Tag[];
};

export enum ArticleStatus {
  DRAFT = "Draft",
  PUBLISHED = "Published",
}
