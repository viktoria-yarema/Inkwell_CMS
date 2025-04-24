export type Tag = {
  id: string;
  title: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  icon?: InkwellIcon;
};

export type UpdateTag = Omit<Tag, "createdAt" | "updatedAt">;

export type ArticleTagId = string;

export enum InkwellIcon {
  BookOpen = "BookOpen",
  Pencil = "Pencil",
  PaintBrush = "PaintBrush",
  Palette = "Palette",
  Users = "Users",
  Smile = "Smile",
  Apple = "Apple",
  Calendar = "Calendar",
  Camera = "Camera",
  Video = "Video",
  MessageCircle = "MessageCircle",
  Image = "Image",
  List = "List",
  CheckCircle = "CheckCircle",
  Heart = "Heart",
  Star = "Star",
  Globe = "Globe",
  Clipboard = "Clipboard",
  Bell = "Bell",
  FileText = "FileText",
}
