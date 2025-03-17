import Editor from "@/shared/components/Editor";
import { Button } from "@/shared/components/Button";
import { useState } from "react";
import SelectButton, { SelectOption } from "@/shared/components/SelectButton";
import { EDITOR_INITIAL_DATA, STATUS_OPTIONS } from "./constants";
import { Input } from "@/shared/components/Input";

const CreateArticlePage = () => {
  const [data, setData] = useState(EDITOR_INITIAL_DATA);
  const [selectedStatus, setSelectedStatus] = useState<SelectOption>(
    STATUS_OPTIONS[0]
  );
  const [title, setTitle] = useState("");
  
  return (
    <div className="flex flex-col gap-10">
      <div className="top-5 right-4 fixed flex gap-2">
        <SelectButton
          selected={selectedStatus}
          options={STATUS_OPTIONS}
          onClick={(option) => {
            setSelectedStatus(option);
          }}
          className="h-10 min-w-14"
        />
        <Button size="lg">Save</Button>
      </div>
      <Input
        id="title"
        type="text"
        placeholder="Title"
        required
        value={title.trimStart()}
        onChange={(e) => setTitle(e.target.value)}
        className="h-[68px] !text-5xl font-medium rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 border-none shadow-none placeholder:text-gray-400 placeholder:text-5xl placeholder:font-light"
      />
      <Editor data={data} onChange={setData} editorblock="editorjs-container" />
    </div>
  );
};

export default CreateArticlePage;
