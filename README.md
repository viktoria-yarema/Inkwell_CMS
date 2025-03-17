# Inkwell CMS

## Introduction

`Inkwell CMS` is a modern content management system developed using cutting-edge web technologies including React, TypeScript, and Vite. The system leverages TailwindCSS with Shadcn UI components for styling, Tanstack React Query for efficient data fetching, and Zustand for state management. Designed with scalability and maintainability in mind, Inkwell CMS ensures a clear separation between UI components, business logic, and data operations.

## Features
- **User-friendly Editor**: Rich text editing with EditorJS supporting various content formats
- **Content Organization**: Categorize and tag content for easy navigation
- **Customizable Themes**: Personalize the look and feel of your published content
- **Responsive Design**: Optimized for viewing on various devices
- **User Management**: Role-based access control for team collaboration

## Project Structure

The project follows a modular architecture that promotes separation of concerns, scalability, and maintainability. This architecture is organized into four main layers:

This architecture follows the principle of unidirectional dependencies:
- `app` can import from `modules`, `entities`, and `shared`
- `modules` can import from `entities` and `shared`
- `entities` can only import from `shared`
- `shared` cannot import from any other layer

This structure ensures that:
1. Higher layers can use functionality from lower layers
2. Lower layers remain independent and reusable
3. Changes in one module don't affect other modules
4. Business logic is separated from UI components
5. Common functionality is easily accessible throughout the application

## Technologies and Libraries

- **React 19**: Latest version of React for building interactive user interfaces
- **TypeScript**: Adds static typing to enhance developer experience and code quality
- **Vite**: Fast and modern frontend build tool and development server
- **React Router v7**: Declarative routing for React applications
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Shadcn UI**: High-quality, accessible, and customizable UI components
- **EditorJS**: Block-styled editor with clean JSON output
- **Tanstack React Query**: Data fetching, caching, and state management for API data
- **Zustand**: Lightweight and flexible state management solution
- **React Hook Form**: Performant and flexible form management
- **Zod**: TypeScript-first schema validation
- **Axios**: Promise-based HTTP client for API requests
- **Radix UI**: Low-level, accessible UI component primitives
- **Tanstack Table**: Headless UI for building powerful tables and datagrids
- **date-fns**: Modern JavaScript date utility library

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/viktoria-yarema/Inkwell_CMS.git
cd Inkwell_CMS
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file based on the `.env.example` template.

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Development

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any questions or feedback, please open an issue on GitHub or contact the maintainers directly.
