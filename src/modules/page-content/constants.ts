import { ContentSection, PageContentData } from "./types";

export const HOME_CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "header",
    name: "Header",
    fields: [
      {
        id: "logo-name",
        label: "Logo/Brand Name",
        value: "Your Brand Name",
        type: "text",
      },
      {
        id: "logo-image",
        label: "Logo Image",
        value: "",
        type: "image",
      },
    ],
  },
  {
    id: "hero",
    name: "Hero Section",
    fields: [
      {
        id: "hero-title",
        label: "Hero Title (H1)",
        value: "Welcome to Our Website",
        type: "text",
      },
      {
        id: "hero-subtitle",
        label: "Hero Subtitle",
        value:
          "Discover amazing content and stay updated with the latest articles.",
        type: "textarea",
      },
    ],
  },
  {
    id: "last-articles",
    name: "Last Articles Section",
    fields: [
      {
        id: "last-articles-subtitle",
        label: "Last Articles Subtitle",
        value: "Latest Posts",
        type: "text",
      },
    ],
  },
  {
    id: "about-section",
    name: "About Section",
    fields: [
      {
        id: "about-title",
        label: "About Title",
        value: "About Us",
        type: "text",
      },
      {
        id: "about-subtitle",
        label: "About Subtitle",
        value: "Learn more about our mission and values.",
        type: "textarea",
      },
      {
        id: "about-image",
        label: "About Image",
        value: "",
        type: "image",
      },
    ],
  },
  {
    id: "categories",
    name: "Categories Section",
    fields: [
      {
        id: "categories-title",
        label: "Categories Title",
        value: "Categories",
        type: "text",
      },
      {
        id: "categories-subtitle",
        label: "Categories Subtitle",
        value: "Explore different topics and find what interests you.",
        type: "textarea",
      },
    ],
  },
  {
    id: "footer",
    name: "Footer",
    fields: [
      {
        id: "footer-brand",
        label: "Footer Brand Name",
        value: "Your Brand Name",
        type: "text",
      },
      {
        id: "footer-subtitle",
        label: "Footer Subtitle",
        value: "Stay connected with us.",
        type: "textarea",
      },
    ],
  },
];

export const ABOUT_CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "intro",
    name: "Introduction",
    fields: [
      {
        id: "intro-title",
        label: "Intro Title",
        value: "About Me",
        type: "text",
      },
      {
        id: "intro-content",
        label: "Intro Content",
        value:
          "Welcome to my personal space. Here you can learn more about my journey and experience.",
        type: "textarea",
      },
    ],
  },
  {
    id: "professional-experience",
    name: "Professional Experience",
    fields: [
      {
        id: "job-title",
        label: "Job Title",
        value: "Senior Developer",
        type: "text",
      },
      {
        id: "timestamp",
        label: "Timestamp",
        value: "2020 - Present",
        type: "text",
      },
      {
        id: "description",
        label: "Description",
        value: "Leading development projects and mentoring junior developers.",
        type: "textarea",
      },
    ],
  },
  {
    id: "philosophy",
    name: "Philosophy",
    fields: [
      {
        id: "philosophy-title",
        label: "Philosophy Title",
        value: "My Philosophy",
        type: "text",
      },
      {
        id: "philosophy-content",
        label: "Philosophy Content",
        value:
          "I believe in continuous learning and creating meaningful solutions.",
        type: "textarea",
      },
    ],
  },
  {
    id: "education-certifications",
    name: "Education and Certifications",
    fields: [
      {
        id: "certification-title",
        label: "Title",
        value: "Computer Science Degree",
        type: "text",
      },
      {
        id: "certification-timestamp",
        label: "Timestamp",
        value: "2018",
        type: "text",
      },
      {
        id: "certification-place",
        label: "Place of Issue",
        value: "University Name",
        type: "text",
      },
    ],
  },
  {
    id: "skills",
    name: "Skills Section",
    fields: [
      {
        id: "skill-title",
        label: "Skill Title",
        value: "React, TypeScript, Node.js",
        type: "text",
      },
    ],
  },
];

export const ARTICLES_CONTENT_SECTIONS: ContentSection[] = [];

export const DEFAULT_PAGE_CONTENT: PageContentData = {
  home: HOME_CONTENT_SECTIONS,
  articles: ARTICLES_CONTENT_SECTIONS,
  about: ABOUT_CONTENT_SECTIONS,
};
