import { ArticleTagId } from "../tags/type";

export type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  authorId: string;
  status: ArticleStatus;
  tags: ArticleTagId[];
  description: string;
  coverImage: string;
};

export type CreateArticle = Omit<Article, "id" | "createdAt" | "updatedAt">;

export enum ArticleStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}
