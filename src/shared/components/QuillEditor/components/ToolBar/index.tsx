import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Type,
} from "lucide-react";

type ToolBarProps = {
  toolbarId: React.RefObject<string>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  insertImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToolBar = ({ insertImage, toolbarId, fileInputRef }: ToolBarProps) => {
  return (
    <div
      id={toolbarId.current}
      className="flex flex-wrap h-auto items-center gap-1 p-2 border border-b-0 rounded-t-md bg-background"
    >
      <div className="flex items-center gap-1 mr-2">
        <button
          className="ql-format p-1 hover:bg-muted rounded"
          title="Normal Text"
        >
          <Type size={18} />
        </button>
        <button
          className="ql-header p-1 hover:bg-muted rounded"
          value="1"
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          className="ql-header p-1 hover:bg-muted rounded"
          value="2"
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          className="ql-header p-1 hover:bg-muted rounded"
          value="3"
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>
      </div>

      <div className="h-6 w-px bg-border mx-1" />

      <div className="flex items-center gap-1 mr-2">
        <button className="ql-bold p-1 hover:bg-muted rounded" title="Bold">
          <Bold size={18} />
        </button>
        <button className="ql-italic p-1 hover:bg-muted rounded" title="Italic">
          <Italic size={18} />
        </button>
        <button className="ql-link p-1 hover:bg-muted rounded" title="Link">
          <Link size={18} />
        </button>
      </div>

      <div className="h-6 w-px bg-border mx-1" />

      <div className="flex items-center gap-1 mr-2">
        <button
          className="ql-align p-1 hover:bg-muted rounded"
          value=""
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          className="ql-align p-1 hover:bg-muted rounded"
          value="center"
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          className="ql-align p-1 hover:bg-muted rounded"
          value="right"
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
      </div>

      <div className="h-6 w-px bg-border mx-1" />

      <div className="flex items-center gap-1 mr-2">
        <button
          className="ql-list p-1 hover:bg-muted rounded"
          value="bullet"
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          className="ql-list p-1 hover:bg-muted rounded"
          value="ordered"
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>

      <div className="h-6 w-px bg-border mx-1" />

      <button
        className="ql-image p-1 hover:bg-muted rounded"
        title="Insert Image"
      >
        <ImageIcon size={18} />
      </button>

      <button
        className="ql-divider p-1 hover:bg-muted rounded"
        title="Insert Divider"
      >
        <Minus size={18} />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={insertImage}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ToolBar;
