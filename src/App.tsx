import React from 'react';
import { Toaster } from 'react-hot-toast';
import AuthGuard from './components/auth/AuthGuard';
import TaskList from './components/tasks/TaskList';
import { CheckSquare, User } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';

export default function App() {
  const { user, signOut } = useAuthStore();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Toaster position="top-right" />
        
        <nav className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  TaskMaster
                </h1>
              </div>

              {user && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{user.full_name || user.email}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <TaskList />
          </div>
        </main>

        <footer className="mt-auto py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              TaskMaster - Organize your work, simplify your life
            </p>
          </div>
        </footer>
      </div>
    </AuthGuard>
  );
}