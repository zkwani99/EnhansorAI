# Overview

Enhansor is a comprehensive AI-powered content creation platform offering image enhancement, text-to-image generation, and text-to-video creation services. The application is built as a modern full-stack web application with a React frontend and Express.js backend, featuring a marketing landing page with multiple service offerings and tiered pricing plans.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with `/api` prefix for all endpoints
- **Development**: Hot module replacement via Vite middleware integration
- **Build Process**: ESBuild for production bundling with external package handling

## Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless driver for cloud deployment
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Centralized schema definitions in `shared/schema.ts` for consistency
- **Development Storage**: In-memory storage implementation for rapid prototyping
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions

## Component Organization
- **Design System**: Comprehensive UI component library with consistent theming
- **Layout Structure**: Modular component architecture with clear separation of concerns
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: ARIA compliance and keyboard navigation support

## Development Environment
- **Replit Integration**: Custom Vite plugins for Replit-specific features and error handling
- **Asset Management**: Organized asset structure with path aliases for clean imports
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Hot Reloading**: Development server with file watching and instant updates

# External Dependencies

## UI and Styling
- **Radix UI**: Complete set of accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework with custom color scheme and design tokens
- **Lucide React**: Icon library for consistent iconography throughout the application
- **Class Variance Authority**: Type-safe styling variants for component consistency

## Database and ORM
- **Neon Database**: Serverless PostgreSQL platform for scalable cloud database hosting
- **Drizzle ORM**: Lightweight TypeScript ORM with excellent type safety and performance
- **Drizzle Kit**: Database migration and introspection tools for schema management

## Development Tools
- **Vite**: Next-generation frontend build tool with fast HMR and optimized bundling
- **ESBuild**: Ultra-fast JavaScript bundler for production builds
- **TypeScript**: Static type checking for enhanced developer experience and code reliability

## Utility Libraries
- **TanStack Query**: Powerful data fetching and caching library for server state
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation for runtime type safety
- **Date-fns**: Modern date utility library for date manipulation and formatting
- **Wouter**: Minimalist routing library for single-page application navigation