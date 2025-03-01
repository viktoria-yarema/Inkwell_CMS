import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
// import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
// import CheckList from "@editorjs/checklist";
import Image from "@editorjs/image";
// import SimpleImage from "@editorjs/simple-image";
import Quote from "@editorjs/quote";
// import Raw from "@editorjs/raw";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  // checkList: CheckList,
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4],
      defaultLevel: 1,
    },
  },
  delimiter: Delimiter,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: "/api/uploadImage",
        byUrl: "/api/fetchImageUrl",
      },
      uploader: {
        uploadByFile(file: File) {
          const formData = new FormData();
          formData.append("image", file);

          return fetch("/api/uploadImage", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              return {
                success: 1,
                file: {
                  url: data.url,
                  // You can also add additional fields:
                  caption: data.caption,
                  withBorder: false,
                  withBackground: false,
                  stretched: false,
                },
              };
            });
        },
        uploadByUrl(url: string) {
          return fetch("/api/fetchImageUrl", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: url,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              return {
                success: 1,
                file: {
                  url: data.url,
                },
              };
            });
        },
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  // linkTool: {
  //   class: LinkTool,
  //   config: {
  //     endpoint: "/api/fetchLinkMetadata", // Your backend endpoint for link metadata
  //   },
  // },
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message",
    },
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
      },
    },
  },
};
