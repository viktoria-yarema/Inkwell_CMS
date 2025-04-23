# Inkwell CMS

## Introduction

`Inkwell CMS` is a modern content management system developed using cutting-edge web technologies including React, TypeScript, and Vite. The system leverages TailwindCSS with Shadcn UI components for styling, Tanstack React Query for efficient data fetching, and Zustand for state management. Built with a focus on user experience and developer productivity, Inkwell CMS provides a robust platform for content creation and management.

## Features
- **Advanced Rich Text Editor**: Quill-based editor with comprehensive formatting options and image support
- **Tag Management System**: Create, update, and organize content with a flexible tagging system
- **User Profile Management**: Customizable user profiles with secure authentication
- **Real-time Content Updates**: Instant content updates with optimistic UI and proper error handling
- **Responsive Design**: Mobile-first approach ensuring seamless experience across all devices
- **Modern UI Components**: Comprehensive set of accessible, customizable UI components
- **Image Processing**: Built-in image upload and processing capabilities
- **Role-based Access Control**: Granular permissions for team collaboration

## Project Structure

The project follows a feature-based modular architecture that promotes clean code practices and maintainability. The architecture is organized into four main layers:

### Core Layers
1. **app**: Application shell, routing, and global components
   - Global layouts and providers
   - Shared modals and notifications
   - Route configurations

2. **modules**: Feature-specific business logic and UI
   - Articles management
   - Tag management
   - User authentication
   - Profile management

3. **entities**: Domain models and data operations
   - API interactions
   - Data models and types
   - State management stores
   - Query and mutation hooks

4. **shared**: Reusable utilities and components
   - UI components library
   - Utility functions
   - Common hooks
   - API middleware

### Architectural Principles
- **Unidirectional Dependencies**: Higher layers can only import from lower layers
- **Feature Encapsulation**: Each module is self-contained with its own components, stores, and logic
- **Component Composition**: UI built from small, reusable components
- **Type Safety**: Comprehensive TypeScript usage throughout the codebase

## Technologies and Libraries

### Core
- **React 19**: Latest version with improved performance and hooks
- **TypeScript**: Enhanced developer experience with static typing
- **Vite**: Modern build tooling with instant HMR

### UI and Styling
- **TailwindCSS**: Utility-first CSS with custom configuration
- **Shadcn UI**: High-quality, accessible component system
- **Radix UI**: Headless UI primitives for complex components
- **Lucide Icons**: Modern icon system

### State Management and Data Fetching
- **Tanstack React Query**: Powerful data synchronization
- **Zustand**: Lightweight state management
- **Zod**: Runtime type validation

### Forms and Validation
- **React Hook Form**: Performant form handling
- **Zod Schema**: Type-safe form validation

### Editor and Media
- **Quill Editor**: Rich text editing with custom toolbar
- **Image Processing**: Client-side image optimization

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **date-fns**: Modern date manipulation

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
