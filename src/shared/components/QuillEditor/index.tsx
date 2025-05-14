"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import cn from "@/shared/utils/cn";
import ToolBar from "./components/ToolBar";
import { decodeHtmlEntities } from "@/shared/utils/decodeHtmlEntities";

const Embed = Quill.import("blots/block/embed");

class DividerBlot extends Embed {
  static create() {
    const node = super.create();
    node.setAttribute("class", "ql-divider");
    return node;
  }
}

DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

Quill.register(DividerBlot);

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function QuillEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  className,
}: QuillEditorProps) {
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<Quill | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toolbarId = useRef(
    `toolbar-${Math.random().toString(36).substring(2, 9)}`
  );

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    if (!editorRef.current) return;

    const toolbarOptions = {
      container: `#${toolbarId.current}`,
      handlers: {
        image: () => {
          fileInputRef.current?.click();
        },
        divider: function () {
          const quill = this.quill;
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "divider", true, Quill.sources.USER);
          quill.setSelection(range.index + 1, Quill.sources.SILENT);
        },
      },
    };

    if (!quillInstanceRef.current) {
      const quill = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: placeholder,
        theme: "snow",
      });

      if (value) {
        try {
          const decodedValue = decodeHtmlEntities(value);
          const delta = JSON.parse(decodedValue);
          quill.setContents(delta);
        } catch (e) {
          console.error("Error parsing delta:", e);

          quill.setText(value);
        }
      }

      quill.on("text-change", () => {
        const contents = quill.getContents();
        onChange(JSON.stringify(contents));
      });

      quillInstanceRef.current = quill;
    }

    return () => {
      quillInstanceRef.current = null;
    };
  }, [mounted, placeholder]);

  useEffect(() => {
    const quill = quillInstanceRef.current;
    if (!quill || !mounted) return;

    const currentContent = JSON.stringify(quill.getContents());

    if (value) {
      try {
        const decodedValue = decodeHtmlEntities(value);
        const parsedValue = JSON.parse(decodedValue);
        const parsedValueStr = JSON.stringify(parsedValue);

        if (parsedValueStr !== currentContent) {
          const selection = quill.getSelection();

          quill.off("text-change");
          quill.setContents(parsedValue);

          quill.on("text-change", () => {
            const contents = quill.getContents();
            onChange(JSON.stringify(contents));
          });

          if (selection) {
            setTimeout(() => quill.setSelection(selection), 0);
          }
        }
      } catch (e) {
        console.error("Invalid Quill delta format", e);
      }
    }
  }, [value, mounted, onChange]);

  useEffect(() => {
    if (!mounted) return;

    const style = document.createElement("style");
    style.innerHTML = `
      .ql-divider {
        border: none;
        height: 1px;
        background-color: #e5e7eb;
        margin: 1rem 0;
      }
      .ql-editor img {
        width: 600px;
        height: 300px;
        object-fit: cover;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [mounted]);

  const insertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && quillInstanceRef.current) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const quill = quillInstanceRef.current;
        if (!quill) return;

        const range = quill.getSelection(true);
        if (range) {
          quill.insertEmbed(range.index, "image", reader.result, "user");
        }
      };

      reader.readAsDataURL(file);
      e.target.value = "";
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("quill-editor-container", className)}>
      <ToolBar
        toolbarId={toolbarId}
        fileInputRef={fileInputRef}
        insertImage={insertImage}
      />
      <div>
        <div ref={editorRef} className="min-h-[200px] border-none" />
      </div>
    </div>
  );
}
