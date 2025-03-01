import React, { memo, useEffect, useRef, FC } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";

interface EditorProps {
  data: any;
  onChange: (data: any) => void;
  editorblock: string;
}

const Editor: FC<EditorProps> = ({ data, onChange, editorblock }) => {
  const ref = useRef<EditorJS | null>(null);

  const initializeEditor = () => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorblock,
        tools: EDITOR_JS_TOOLS as any,
        data: data,
        placeholder: "Write your article here",
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }
  };

  useEffect(() => {
    initializeEditor();

    //Add a return function to handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={editorblock} />;
};

export default memo(Editor);
