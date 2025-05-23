import { Input } from "@/shared/components/Input";

type ArticleTitleProps = {
  title: string;
  setTitle: (title: string) => void;
};

const ArticleTitle = ({ title, setTitle }: ArticleTitleProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Input
        id="title"
        type="text"
        placeholder="Title"
        required
        value={title.trimStart()}
        onChange={(e) => setTitle(e.target.value)}
        className="h-[68px] !text-5xl font-medium rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 border-none shadow-none placeholder:text-gray-400 placeholder:text-5xl placeholder:font-light"
      />
    </div>
  );
};

export default ArticleTitle;
