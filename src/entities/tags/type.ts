export type Tag = {
  id: string;
  title: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type UpdateTag = Omit<Tag, "createdAt" | "updatedAt">;
