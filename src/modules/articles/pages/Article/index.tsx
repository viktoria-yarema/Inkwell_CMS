import { useGetArticleQuery } from "@/entities/articles/queries/useGetArticleQuery";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const { id } = useParams();
  const { data: article } = useGetArticleQuery(id as string);

  return <div>ArticlePage {article?.title}</div>;
};

export default ArticlePage;
