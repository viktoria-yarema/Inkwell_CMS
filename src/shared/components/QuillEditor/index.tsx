"use client";

import { useEffect, useRef, useState, type React } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import cn from "@/shared/utils/cn";
import ToolBar from "./components/ToolBar";

const Embed = Quill.import("blots/block/embed");

// Helper function to decode HTML entities
function decodeHtmlEntities(str: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
}

class DividerBlot extends Embed {
  static create() {
    const node = super.create();
    node.setAttribute("class", "ql-divider");
    return node;
  }
}

DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

// Register our custom blot
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

  // Initialize Quill
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    if (!editorRef.current) return;

    // Define toolbar options
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

    // Initialize Quill only once
    if (!quillInstanceRef.current) {
      const quill = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: placeholder,
        theme: "snow",
      });

      // Set initial content
      if (value) {
        try {
          // Decode HTML entities before parsing JSON
          const decodedValue = decodeHtmlEntities(value);
          const delta = JSON.parse(decodedValue);
          quill.setContents(delta);
        } catch (e) {
          console.error("Error parsing delta:", e);
          // If parsing fails, try to set as plain text
          quill.setText(value);
        }
      }

      // Listen for changes
      quill.on("text-change", () => {
        const contents = quill.getContents();
        onChange(JSON.stringify(contents));
      });

      quillInstanceRef.current = quill;
    }

    // Cleanup
    return () => {
      quillInstanceRef.current = null;
    };
  }, [mounted, placeholder]); // Remove value and onChange from dependencies

  // Handle external value changes
  useEffect(() => {
    const quill = quillInstanceRef.current;
    if (!quill || !mounted) return;

    // Only update content if it's different from current content
    const currentContent = JSON.stringify(quill.getContents());

    if (value) {
      try {
        // Decode HTML entities before parsing JSON
        const decodedValue = decodeHtmlEntities(value);
        const parsedValue = JSON.parse(decodedValue);
        const parsedValueStr = JSON.stringify(parsedValue);

        if (parsedValueStr !== currentContent) {
          // Store current selection
          const selection = quill.getSelection();

          // Temporarily remove the text-change handler
          quill.off("text-change");
          quill.setContents(parsedValue);
          // Re-add the text-change handler
          quill.on("text-change", () => {
            const contents = quill.getContents();
            onChange(JSON.stringify(contents));
          });

          // Restore selection if it existed
          if (selection) {
            setTimeout(() => quill.setSelection(selection), 0);
          }
        }
      } catch (e) {
        console.error("Invalid Quill delta format", e);
      }
    }
  }, [value, mounted, onChange]);

  // Add CSS for divider
  useEffect(() => {
    if (!mounted) return;

    // Add custom CSS for the divider
    const style = document.createElement("style");
    style.innerHTML = `
      .ql-divider {
        border: none;
        height: 1px;
        background-color: #e5e7eb;
        margin: 1rem 0;
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
        <div ref={editorRef} className="min-h-[200px]  border-none" />
      </div>
    </div>
  );
}
