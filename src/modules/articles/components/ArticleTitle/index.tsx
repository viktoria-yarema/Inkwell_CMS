import { Input } from "@/shared/components/Input";
import { MultiSelect } from "@/shared/components/MultiSelect";

type ArticleTitleProps = {
  title: string;
  setTitle: (title: string) => void;
};

const ArticleTitle = ({ title, setTitle }: ArticleTitleProps) => {
  return (
    <>
      <Input
        id="title"
        type="text"
        placeholder="Title"
        required
        value={title.trimStart()}
        onChange={(e) => setTitle(e.target.value)}
        className="h-[68px] !text-5xl font-medium rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 border-none shadow-none placeholder:text-gray-400 placeholder:text-5xl placeholder:font-light"
      />
      <MultiSelect />
    </>
  );
};

export default ArticleTitle;
