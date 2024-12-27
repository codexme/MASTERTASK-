TaskMaster AI - Project Documentation
Overview
TaskMaster AI is a modern task management application that leverages artificial intelligence to help users organize, prioritize, and complete tasks efficiently. The application is built with React, TypeScript, and Supabase, featuring a beautiful UI with Tailwind CSS.

Key Features
AI-powered task management
Real-time task synchronization
File attachments and link management
Subtask support
Due date tracking
Team collaboration features
Authentication system
Subscription-based pricing tiers
Technical Stack
Frontend
React 18.3
TypeScript
Tailwind CSS
Lucide React (for icons)
Zustand (state management)
React Hot Toast (notifications)
React Dropzone (file uploads)
Backend
Supabase (Backend as a Service)
PostgreSQL database
Authentication
Row Level Security (RLS)
Storage for attachments
Real-time subscriptions
Deployment
Netlify (Frontend hosting)
Project Structure

src/
├── components/         # React components
│   ├── auth/          # Authentication related components
│   ├── tasks/         # Task management components
│   ├── attachments/   # File attachment components
│   ├── links/         # Link management components
│   └── landing/       # Landing page components
├── lib/               # Core utilities and API
│   ├── api/          # API integration layer
│   └── supabase.ts   # Supabase client configuration
├── store/            # Zustand state management
├── types/            # TypeScript type definitions
└── utils/            # Utility functions

supabase/
└── migrations/       # Database migrations
Database Schema
Core Tables
users - User profiles and metadata
tasks - Main tasks table
subtasks - Subtask management
attachments - File attachments
links - Task-related links
badges - Achievement system
plans - Subscription plans
subscriptions - User subscriptions
Security
Row Level Security (RLS) policies for all tables
Public/authenticated access controls
Secure file storage policies
Features Implementation
Authentication
Email/password authentication
Protected routes with AuthGuard
User profile management
Task Management
CRUD operations for tasks
Real-time updates
File attachments
Link management
Subtask tracking
Progress calculation
Due date handling
Subscription System
Three-tier pricing model (Free, Pro, Enterprise)
Feature limitations based on plan
Yearly/monthly billing options
Development Process
Initial Setup

Project scaffolding with Vite
TypeScript configuration
Tailwind CSS integration
Database Design

Schema planning
Migration creation
RLS policy implementation
Core Features

Authentication system
Task management
File handling
Real-time updates
UI/UX Development

Responsive design
Component architecture
Landing page
Dashboard interface
Deployment

Netlify configuration
Environment setup
Production build optimization
Getting Started
Clone the repository
Install dependencies: npm install
Set up Supabase project and environment variables
Run migrations: supabase db push
Start development server: npm run dev
Environment Variables

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Deployment
The application is deployed on Netlify and can be accessed at:
https://glowing-gumption-9a2779.netlify.app

Future Enhancements
Advanced AI features integration
Team collaboration improvements
Mobile application development
Advanced analytics dashboard
Integration with popular tools
Enhanced notification system
Contributing
Contributions are welcome! Please read our contributing guidelines and code of conduct before submitting pull requests.

License
This project is licensed under the MIT License                      .[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/codexme/MASTERTASK-)
