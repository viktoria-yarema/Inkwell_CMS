import Editor from "@/shared/components/Editor";
import { Button } from "@/shared/components/Button";
import { useState } from "react";
import SelectButton, { SelectOption } from "@/shared/components/SelectButton";
import { EDITOR_INITIAL_DATA, STATUS_OPTIONS } from "./constants";

const CreateArticlePage = () => {
  const [data, setData] = useState(EDITOR_INITIAL_DATA);
  const [selectedStatus, setSelectedStatus] = useState<SelectOption>(
    STATUS_OPTIONS[0]
  );

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
      <Editor data={data} onChange={setData} editorblock="editorjs-container" />
    </div>
  );
};

export default CreateArticlePage;
