export type BaseField = {
  id: string;
  label: string;
  value: string;
  type: "text" | "textarea" | "image";
};

export type ContentSection = {
  id: string;
  name: string;
  fields: BaseField[];
};

export type HomeContent = {
  header: {
    id: string;
    name: string;
    fields: [
      {
        id: "logo-name";
        label: "Logo/Brand Name";
        value: string;
        type: "text";
      },
      { id: "logo-image"; label: "Logo Image"; value: string; type: "image" },
    ];
  };
  hero: {
    id: string;
    name: string;
    fields: [
      {
        id: "hero-title";
        label: "Hero Title (H1)";
        value: string;
        type: "text";
      },
      {
        id: "hero-subtitle";
        label: "Hero Subtitle";
        value: string;
        type: "textarea";
      },
    ];
  };
  lastArticles: {
    id: string;
    name: string;
    fields: [
      {
        id: "last-articles-subtitle";
        label: "Last Articles Subtitle";
        value: string;
        type: "text";
      },
    ];
  };
  aboutSection: {
    id: string;
    name: string;
    fields: [
      { id: "about-title"; label: "About Title"; value: string; type: "text" },
      {
        id: "about-subtitle";
        label: "About Subtitle";
        value: string;
        type: "textarea";
      },
      { id: "about-image"; label: "About Image"; value: string; type: "image" },
    ];
  };
  categories: {
    id: string;
    name: string;
    fields: [
      {
        id: "categories-title";
        label: "Categories Title";
        value: string;
        type: "text";
      },
      {
        id: "categories-subtitle";
        label: "Categories Subtitle";
        value: string;
        type: "textarea";
      },
    ];
  };
  footer: {
    id: string;
    name: string;
    fields: [
      {
        id: "footer-brand";
        label: "Footer Brand Name";
        value: string;
        type: "text";
      },
      {
        id: "footer-subtitle";
        label: "Footer Subtitle";
        value: string;
        type: "textarea";
      },
    ];
  };
};

// About Page Content Types
export type AboutContent = {
  intro: {
    id: string;
    name: string;
    fields: [
      { id: "intro-title"; label: "Intro Title"; value: string; type: "text" },
      {
        id: "intro-content";
        label: "Intro Content";
        value: string;
        type: "textarea";
      },
    ];
  };
  professionalExperience: {
    id: string;
    name: string;
    fields: [
      { id: "job-title"; label: "Job Title"; value: string; type: "text" },
      { id: "timestamp"; label: "Timestamp"; value: string; type: "text" },
      {
        id: "description";
        label: "Description";
        value: string;
        type: "textarea";
      },
    ];
  };
  philosophy: {
    id: string;
    name: string;
    fields: [
      {
        id: "philosophy-title";
        label: "Philosophy Title";
        value: string;
        type: "text";
      },
      {
        id: "philosophy-content";
        label: "Philosophy Content";
        value: string;
        type: "textarea";
      },
    ];
  };
  educationCertifications: {
    id: string;
    name: string;
    fields: [
      {
        id: "certification-title";
        label: "Title";
        value: string;
        type: "text";
      },
      {
        id: "certification-timestamp";
        label: "Timestamp";
        value: string;
        type: "text";
      },
      {
        id: "certification-place";
        label: "Place of Issue";
        value: string;
        type: "text";
      },
    ];
  };
  skills: {
    id: string;
    name: string;
    fields: [
      { id: "skill-title"; label: "Skill Title"; value: string; type: "text" },
    ];
  };
};

export type PageContentType = "home" | "articles" | "about";

export type PageContentData = {
  home: ContentSection[];
  articles: ContentSection[];
  about: ContentSection[];
};
